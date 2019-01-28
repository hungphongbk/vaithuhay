"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _values = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

exports.default = function (mainAssets) {
  return {
    apply: function apply(compiler) {
      var config = {
        host: "188.166.177.127",
        port: "2234",
        user: "root",
        privateKey: getFilePath(".ssh/id_rsa")
      },
          _ref = [ssh.connect(config), ssh2.connect(config)],
          connectPromise = _ref[0],
          connect2Promise = _ref[1];


      function readOld() {
        return JSON.parse(_fs2.default.readFileSync(__dirname + "/current.json"));
      }

      function readCurrent(assets) {
        var rs = {};

        (0, _flatten2.default)((0, _values2.default)(assets)).forEach(function (item) {
          var _item$split = item.split("?"),
              _item$split2 = (0, _slicedToArray3.default)(_item$split, 2),
              file = _item$split2[0],
              hash = _item$split2[1];

          rs[file] = hash ? hash : "";
        });
        return rs;
      }

      compiler.plugin("done", function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(stat) {
          var _stat$toJson, assetsByChunkName, newAssets, postObj;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _promise2.default.all([connectPromise, connect2Promise]);

                case 2:
                  console.log("SSH connection successfully");
                  _context.next = 5;
                  return ssh.execCommand("rm -rf assets-dist", defaultSshOpts);

                case 5:

                  // const uploads = await new Promise(resolve => {
                  //   fs.readdir(
                  //     path.resolve(__dirname, `../assets-dist`),
                  //     (err, items) => {
                  //       resolve(items);
                  //     }
                  //   );
                  // });
                  // function putFile(client, filename) {
                  //   return client
                  //     .putFile(
                  //       path.resolve(__dirname, `../assets-dist/${filename}`),
                  //       remoteDir + `assets-dist/${filename}`
                  //     )
                  //     .then(() => {
                  //       console.log(`${filename} has been uploaded`);
                  //     });
                  // }
                  // for (const filenames of chunk(uploads, 2))
                  //   await Promise.all([
                  //     putFile(ssh, filenames[0]),
                  //     putFile(ssh2, filenames[1])
                  //   ]);
                  // console.log("Upload files completed");

                  // Finally, update hash
                  _stat$toJson = stat.toJson({
                    hash: true
                  }), assetsByChunkName = _stat$toJson.assetsByChunkName;
                  newAssets = readCurrent(assetsByChunkName), postObj = (0, _zipObject2.default)(mainAssets, mainAssets.map(function (asset) {
                    return newAssets[asset];
                  }));

                  console.log(newAssets);

                  return _context.abrupt("return", new _promise2.default(function (resolve) {
                    _axios2.default
                    // .post("https://server.vaithuhay.com/b/meta?key=assetHash", postObj)
                    .post("https://server.vaithuhay.com/b/callback/updateTheme", postObj, {
                      httpsAgent: new _https2.default.Agent({
                        rejectUnauthorized: false
                      })
                    }).then(function () {
                      console.log("Resource hash has been updated :)");
                      // console.log(postObj);
                      resolve();
                    }).catch(function (err) {
                      console.error(err.message);
                      resolve();
                    });
                  }));

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  };
};

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _flatten = require("lodash/flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _zipObject = require("lodash/zipObject");

var _zipObject2 = _interopRequireDefault(_zipObject);

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

var _nodeSsh = require("node-ssh");

var _nodeSsh2 = _interopRequireDefault(_nodeSsh);

var _chunk = require("lodash/chunk");

var _chunk2 = _interopRequireDefault(_chunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PromiseSftp from 'promise-sftp'
var localDir = _path2.default.join(__dirname, "../assets/"),
    remoteDir = "/home/phong/api.v1/vaithuhay/",
    ssh = new _nodeSsh2.default(),
    ssh2 = new _nodeSsh2.default(),
    defaultSshOpts = { cwd: remoteDir };

function getFilePath(relativePath) {
  return _path2.default.resolve(_os2.default.homedir(), relativePath);
}

//# sourceMappingURL=completed.js.map