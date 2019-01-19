import axios from "axios";
// import PromiseSftp from 'promise-sftp'
import path from "path";
import fs from "fs";
import flatten from "lodash/flatten";
import zipObject from "lodash/zipObject";

const localDir = path.join(__dirname, "../assets/"),
  remoteDir = "/home/phong/api.v1/vaithuhay/";

export default function(mainAssets) {
  return {
    apply(compiler) {
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
        const { hash, assetsByChunkName } = stat.toJson({
          hash: true
        });

        const newAssets = readCurrent(assetsByChunkName),
          postObj = zipObject(
            mainAssets,
            mainAssets.map(asset => newAssets[asset])
          );

        axios
          .post("https://server.vaithuhay.com/b/meta?key=assetHash", {
            hash,
            ...postObj
          })
          .then(function() {
            console.log("Resource hash has been updated :)");
            console.log(postObj);
          })
          .catch(function(err) {
            console.log(err.message);
          });
      });
    }
  };
}
