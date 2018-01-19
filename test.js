let assert = require('assert');

function trim(s) {
  return s.replace(/^\s*|\s*$/g, '')
}

assert.equal(trim(' sd  '), 'sd')
assert.equal(trim(' s d  '), 's d')



