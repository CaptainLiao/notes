import assert = require('assert')
import {
  arrayEqual
} from '../../src/lib/utils/equal'

describe('arrayEqual(a, b)', () => {
  it('返回 true，当a === b 且都是array', () => {
    let test = [0,2,3,9,12,22]
    let res = [0,2,3,9,12,22]

    assert(arrayEqual( test, res ) === true)
  })
})

describe('arrayEqual(a, b)', () => {
  it('返回 false, 当 a!== b 或者其中有一个不是 array', () => {
    let test = [2,22,3,9,12,0]
    let res = [0,2,3,9,12,22]

    assert(arrayEqual( test, res ) === false)
    assert(arrayEqual( test, 1 ) === false)
    assert(arrayEqual( 1, 1 ) === false)
  })
})

