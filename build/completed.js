"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _values = require("/Users/myowngrave/WebstormProjects/vaithuhay/node_modules/babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

exports.default = function (mainAssets) {
  return {
    apply: function apply(compiler) {
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
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(stat) {
          var _stat$toJson, hash, assetsByChunkName, newAssets, postObj;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _stat$toJson = stat.toJson({
                    hash: true
                  }), hash = _stat$toJson.hash, assetsByChunkName = _stat$toJson.assetsByChunkName;
                  newAssets = readCurrent(assetsByChunkName), postObj = (0, _zipObject2.default)(mainAssets, mainAssets.map(function (asset) {
                    return newAssets[asset];
                  }));


                  _axios2.default.post("https://server.vaithuhay.com/b/meta?key=assetHash", (0, _extends3.default)({
                    hash: hash
                  }, postObj)).then(function () {
                    console.log("Resource hash has been updated :)");
                    console.log(postObj);
                  }).catch(function (err) {
                    console.log(err.message);
                  });

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
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

var _flatten = require("lodash/flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _zipObject = require("lodash/zipObject");

var _zipObject2 = _interopRequireDefault(_zipObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PromiseSftp from 'promise-sftp'
var localDir = _path2.default.join(__dirname, "../assets/"),
    remoteDir = "/home/phong/api.v1/vaithuhay/";

//# sourceMappingURL=completed.js.map