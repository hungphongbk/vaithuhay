"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _axios = _interopRequireDefault(require("axios"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _os = _interopRequireDefault(require("os"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _zipObject = _interopRequireDefault(require("lodash/zipObject"));

var _https = _interopRequireDefault(require("https"));

var _nodeSsh = _interopRequireDefault(require("node-ssh"));

var _chunk = _interopRequireDefault(require("lodash/chunk"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var localDir = _path.default.join(__dirname, "../assets/"),
    remoteDir = "/home/phong/api.v1/vaithuhay/",
    ssh = new _nodeSsh.default(),
    // ssh2 = new NodeSSH(),
defaultSshOpts = {
  cwd: remoteDir
};

function getFilePath(relativePath) {
  return _path.default.resolve(_os.default.homedir(), relativePath);
}

function _default(mainAssets) {
  return {
    apply: function apply(compiler) {
      var config = {
        host: "188.166.177.127",
        port: "2234",
        user: "root",
        privateKey: getFilePath(".ssh/id_rsa")
      },
          connectPromise = ssh.connect(config);

      function readOld() {
        return JSON.parse(_fs.default.readFileSync(__dirname + "/current.json"));
      }

      function readCurrent(assets) {
        var rs = {};
        (0, _flatten.default)(Object.values(assets)).forEach(function (item) {
          var _item$split = item.split("?"),
              _item$split2 = _slicedToArray(_item$split, 2),
              file = _item$split2[0],
              hash = _item$split2[1];

          rs[file] = hash ? hash : "";
        });
        return rs;
      }

      compiler.plugin("done",
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(stat) {
          var _stat$toJson, assetsByChunkName, newAssets;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return connectPromise;

                case 2:
                  console.log("SSH connection successfully");
                  _context.next = 5;
                  return ssh.execCommand("rm -rf assets-dist", defaultSshOpts);

                case 5:
                  _context.next = 7;
                  return ssh.putDirectory(_path.default.resolve(__dirname, "../assets-dist/"), remoteDir + "assets-dist", {
                    recursive: true,
                    concurrency: 7,
                    tick: function tick(localPath, _, err) {
                      if (err) {
                        console.error(err.message);
                        console.error(localPath);
                      } else console.info("".concat(localPath, " successfully uploaded!"));
                    }
                  });

                case 7:
                  console.log("Upload files completed"); // Finally, update hash

                  _stat$toJson = stat.toJson({
                    hash: true
                  }), assetsByChunkName = _stat$toJson.assetsByChunkName;
                  newAssets = readCurrent(assetsByChunkName);
                  _context.next = 12;
                  return _axios.default.post("https://server.vaithuhay.com/b/callback/updateTheme", newAssets, {
                    httpsAgent: new _https.default.Agent({
                      rejectUnauthorized: false
                    })
                  }).then(function () {
                    console.log("Resource hash has been updated :)"); // console.log(postObj);
                  }).catch(function (err) {
                    console.error(err.message);
                  });

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  };
}

//# sourceMappingURL=completed.js.map