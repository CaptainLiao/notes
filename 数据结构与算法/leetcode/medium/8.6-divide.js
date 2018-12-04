/**
 * 两数相除
给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

示例 1:

输入: dividend = 10, divisor = 3
输出: 3
示例 2:

输入: dividend = 7, divisor = -3
输出: -2
说明:

被除数和除数均为 32 位有符号整数。
除数不为 0。
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
 */

/**
 * 【分析】
 * 众所周知，1 << 1 === 2。所以，我们通过对除数循环左移 1 位，来逼近被除数
 * 可以得到下面的计算公式，其中，k1,k2,k3...表示每层循环的次数
 * devidend >= 2^k1*devisor + 2^k2*devisor + ...
 */ 

function devide(devidend, devisor) {
  var MAX_INT = 2147483647
  var MIN_INT = -2147483648
  var sb = (devidend < 0 ^ devisor < 0) ? -1 : 1

  if (!devisor) return MAX_INT
  if ((devidend === MAX_INT || devidend === MIN_INT ) && Math.abs(devisor) === 1) 
    return sb > 0 ? INT_MAX : INT_MIN

  var dvd = Math.abs(dividend)
  var dvs = Math.abs(divisor)
  var res = 0

  while (dvd >= dvs) {
    var temp = dvs
    var count = 1
    while (dvd >= (temp << 1)) {
      temp <<= 1
      count <<= 1
    }

    dvd -= temp
    res += count
  }

  return sb * res 
}
