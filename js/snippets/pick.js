var valByKeypath = require('./getValByPath');
var type = require('./type');

function pick(properties, o) {
  if (Object(o) !== o) {
    return o;
  }
  if (typeof properties === 'string') {
    return valByKeypath(properties, o);
  }
  if (type(properties) === 'array') {
    return properties.reduce(function(m, key) {
      var v = o[key];
      if (v !== undefined) {
        m[key] = v;
      }
      return m;
    }, {});
  }
  if (type(properties) === 'object') {
    return Object.keys(properties).reduce(function(m, k) {
      var pick_k = properties[k],
        fn, orgVals, v;
      if (type(pick_k) === 'string') {
        v = valByKeypath(pick_k, o);
        if (v !== undefined) {
          m[k] = v;
        }
      } else if (type(pick_k) === 'array') {
        fn = pick_k[pick_k.length - 1];
        if (type(fn) === 'function') {
          orgVals = pick_k.slice(0, pick_k.length - 1).map(function(k) {
            return valByKeypath(k, o);
          });
          m[k] = fn.apply(o, orgVals);
        }
      } else if (type(pick_k) === 'function') {
        m[k] = pick_k.call(o);
      }
      return m;
    }, {});
  }
}
module.exports = function curried$pick(properties, o) {
  if (arguments.length > 1) {
    return pick(properties, o);
  } else {
    return function(_o) {
      return pick(properties, _o);
    };
  }
};