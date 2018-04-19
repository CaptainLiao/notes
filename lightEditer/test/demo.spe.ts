import assert = require('assert')
import add2 from '../src/lib/add'
import a from '../src/index'

describe('add()', () => {
  it('should reeturn 5', () => {
    assert(add2(2,3) === 5)
  })
})

