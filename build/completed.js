'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _entries = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _values = require('/Users/hungphongbk/Projects/PHP/vaithuhay/haravan/node_modules/babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

exports.default = function (mainAssets) {
  return {
    apply: function apply(compiler) {
      function readOld() {
        return JSON.parse(_fs2.default.readFileSync(__dirname + '/current.json'));
      }

      function readCurrent(assets) {
        var rs = {};

        (0, _flatten2.default)((0, _values2.default)(assets)).forEach(function (item) {
          var _item$split = item.split('?'),
              _item$split2 = (0, _slicedToArray3.default)(_item$split, 2),
              file = _item$split2[0],
              hash = _item$split2[1];

          rs[file] = hash ? hash : '';
        });
        return rs;
      }

      function diff(oldAssets, newAssets) {
        var rs = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(newAssets)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

            var file = _ref2[0];
            var hash = _ref2[1];

            var push = false;
            if (!oldAssets[file] || oldAssets[file] !== hash) push = true;
            if (hash.length === 0) push = true;
            if (push) rs.push(file);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(mainAssets), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _file = _step2.value;
            if (typeof newAssets[_file] === 'undefined') {
              rs.push(_file);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return rs;
      }

      function write(newAssets) {
        _fs2.default.writeFileSync(__dirname + '/current.json', (0, _stringify2.default)(newAssets, null, 2), 'utf-8');
      }

      compiler.plugin('done', function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(stat) {
          var _stat$toJson, hash, assetsByChunkName, oldAssets, newAssets, uploadFiles;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _stat$toJson = stat.toJson({
                    hash: true
                  }), hash = _stat$toJson.hash, assetsByChunkName = _stat$toJson.assetsByChunkName;
                  oldAssets = readOld(), newAssets = readCurrent(assetsByChunkName), uploadFiles = diff(oldAssets, newAssets);


                  _axios2.default.post('https://api.v1.hungphongbk.com/vaithuhay/b/meta?key=assetHash', (0, _extends3.default)({
                    hash: hash
                  }, (0, _zipObject2.default)(mainAssets, mainAssets.map(function (asset) {
                    return newAssets[asset];
                  })))).then(function () {
                    console.log('Resource hash has been updated');
                  }).catch(function (err) {
                    console.log(err.message);
                  });

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  };
};

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _zipObject = require('lodash/zipObject');

var _zipObject2 = _interopRequireDefault(_zipObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PromiseSftp from 'promise-sftp'
var localDir = _path2.default.join(__dirname, '../assets/'),
    remoteDir = '/home/phong/api.v1/vaithuhay/';

//# sourceMappingURL=completed.js.map