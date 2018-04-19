import assert = require('assert')
import {
  arrayEqual
} from '../src/lib/utils/equal'

import {
  getStringWithComma,
  bubbleSort
} from '../src/main'

describe('getStringWithComma()', () => {
  it('should reeturn xxx', () => {
    assert(getStringWithComma('2323',3) === '2,323')
  })
})

describe('数组冒泡排序：bubbleSort(a, b)', () => {
  it('对数组进行从小到大排序，返回true', () => {
    let test = [2,22,3,9,12,0]
    let res = [0,2,3,9,12,22]

    assert(arrayEqual( bubbleSort(test), res ) === true)
  })
})

