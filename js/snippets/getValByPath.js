var assert = require('assert');
var type = require('./type');
function _getValByPath(kpath, o) {
  assert(typeof kpath === 'string', 'kpath should be a string!');
  kpath = kpath.trim();
  if (kpath.length === 0 || Object(o) !== o) return o;
  var paths = kpath.split('.'),
    i = 0;
  while (i < paths.length) {
    o = o[paths[i]];
    if (Object(o) !== o) break;
    i++;
  }
  if (i < paths.length - 1) return undefined;
  return o;
}

function _updateKeyPath(kpath, o, data) {
    assert(type(kpath) === 'string', 'kpath should be a string!', TypeError);
    assert(type(o) === 'object', 'o should be an object!', TypeError);
    kpath = kpath.trim();
    if (kpath.length === 0) return;
    var paths = kpath.split('.'),
      i = 0,
      p, _o;
    while (i < paths.length - 1) {
      p = paths[i];
      _o = o[p];
      if (Object(_o) !== _o) {
        if (_o !== undefined) {
          throw new Error('[updateKeyPath] invalid keypath! Value with path "' + paths.slice(0, i + 1).join('.') + '" should be an object, but given: ' + _o);
        } else {
          o[p] = {}; // ensure keypath is valid
        }
      }
      o = o[p];
      i++;
    }
    o[paths[i]] = data;
  }

  function valByKeypath(kpath, o, data) {
    if (arguments.length < 3) {
      return _getValByPath(kpath, o);
    } else {
      return _updateKeyPath(kpath, o, data);
    }
  }

module.exports = valByKeypath;