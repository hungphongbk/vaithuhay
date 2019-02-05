import axios from "axios";
// import PromiseSftp from 'promise-sftp'
import path from "path";
import fs from "fs";
import os from "os";
import flatten from "lodash/flatten";
import zipObject from "lodash/zipObject";
import https from "https";
import NodeSSH from "node-ssh";
import chunk from "lodash/chunk";

const localDir = path.join(__dirname, "../assets/"),
  remoteDir = "/home/phong/api.v1/vaithuhay/",
  ssh = new NodeSSH(),
  // ssh2 = new NodeSSH(),
  defaultSshOpts = { cwd: remoteDir };

function getFilePath(relativePath) {
  return path.resolve(os.homedir(), relativePath);
}

export default function(mainAssets) {
  return {
    apply(compiler) {
      const config = {
          host: "188.166.177.127",
          port: "2234",
          user: "root",
          privateKey: getFilePath(".ssh/id_rsa")
        },
        connectPromise = ssh.connect(config);

      function readOld() {
        return JSON.parse(fs.readFileSync(__dirname + "/current.json"));
      }

      function readCurrent(assets) {
        const rs = {};

        flatten(Object.values(assets)).forEach(item => {
          const [file, hash] = item.split("?");
          rs[file] = hash ? hash : "";
        });
        return rs;
      }

      compiler.plugin("done", async function(stat) {
        // First, empty & re-upload
        await connectPromise;
        console.log("SSH connection successfully");
        await ssh.execCommand("rm -rf assets-dist", defaultSshOpts);

        await ssh.putDirectory(
          path.resolve(__dirname, "../assets-dist/"),
          remoteDir + "assets-dist",
          {
            recursive: true,
            concurrency: 7,
            tick(localPath, _, err) {
              if (err) {
                console.error(err.message);
                console.error(localPath);
              } else console.info(`${localPath} successfully uploaded!`);
            }
          }
        );
        console.log("Upload files completed");

        // Finally, update hash
        const { assetsByChunkName } = stat.toJson({
          hash: true
        });

        const newAssets = readCurrent(assetsByChunkName);

        await axios
          .post(
            "https://server.vaithuhay.com/b/callback/updateTheme",
            newAssets,
            {
              httpsAgent: new https.Agent({
                rejectUnauthorized: false
              })
            }
          )
          .then(function() {
            console.log("Resource hash has been updated :)");
            // console.log(postObj);
          })
          .catch(function(err) {
            console.error(err.message);
          });
      });
    }
  };
}
