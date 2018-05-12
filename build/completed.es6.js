import axios from 'axios'
// import PromiseSftp from 'promise-sftp'
import path from 'path'
import fs from 'fs'
import flatten from 'lodash/flatten'
import zipObject from 'lodash/zipObject'

const localDir = path.join(__dirname, '../assets/'),
  remoteDir = '/home/phong/api.v1/vaithuhay/';

export default function (mainAssets) {
  return {
    apply(compiler) {
      function readOld() {
        return JSON.parse(fs.readFileSync(__dirname + '/current.json'));
      }

      function readCurrent(assets) {
        const rs = {};

        flatten(Object.values(assets)).forEach(item => {
          const [file, hash] = item.split('?')
          rs[file] = hash ? hash : ''
        })
        return rs;
      }

      function diff(oldAssets, newAssets) {
        const rs = []
        for (const [file, hash] of Object.entries(newAssets)) {
          let push = false;
          if (!oldAssets[file] || oldAssets[file] !== hash)
            push = true;
          if (hash.length === 0) push = true;
          if (push) rs.push(file);

        }
        for (const file of mainAssets) if (typeof newAssets[file] === 'undefined') {
          rs.push(file);
        }
        return rs;
      }

      function write(newAssets) {
        fs.writeFileSync(__dirname + '/current.json', JSON.stringify(newAssets, null, 2), 'utf-8');
      }

      compiler.plugin('done', async function (stat) {
        const {hash, assetsByChunkName} = stat.toJson({
          hash: true
        });

        const oldAssets = readOld(),
          newAssets = readCurrent(assetsByChunkName),
          uploadFiles = diff(oldAssets, newAssets);

        axios.post('https://server.vaithuhay.com/b/meta?key=assetHash', {
          hash,
          ...zipObject(mainAssets, mainAssets.map(asset => newAssets[asset]))
        }).then(function () {
          console.log('Resource hash has been updated')
        }).catch(function (err) {
          console.log(err.message);
        })
      })
    }
  }
}
