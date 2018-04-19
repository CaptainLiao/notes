import assert = require('assert')
import add2 from '../src/lib/add'
import a from '../src/index'

describe('getStringWithComma()', () => {
  it('should reeturn xxx', () => {
    assert(a.getStringWithComma('2323',3) === '2,323')
  })
})

