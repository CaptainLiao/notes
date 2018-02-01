let assert = require('assert');

function trim(s) {
  return s.replace(/^\s*|\s*$/g, '')
}

assert.equal(trim(' sd  '), 'sd')
assert.equal(trim(' s d  '), 's d')

function getIn(target, keyPath, notFoundValue = undefined) {
  for (let key in keyPath) {
    if (target && target.hasOwnProperty(keyPath[key])) {
      target = target[keyPath[key]];
    } else {
      return notFoundValue;
    }
  }
  return target;
}

function get(target, keyPathStr, notFoundValue = undefined) {
  return getIn(target, keyPathStr.split('.'), notFoundValue);
}

let getTest = {
  a: {
    b: [{
      c: 111
    },{
      d: 222
    }]
  }
}
assert.equal(get(getTest, 'a.b[0].c'), 111)