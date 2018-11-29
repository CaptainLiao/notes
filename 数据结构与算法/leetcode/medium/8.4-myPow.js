/**
 * Pow(x, n)
实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例 1:

输入: 2.00000, 10
输出: 1024.00000
示例 2:

输入: 2.10000, 3
输出: 9.26100
示例 3:

输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
说明:

-100.0 < x < 100.0
n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。
 */

/**
 * [分析]
 * 计算过程：
 * myPow(2, 5)
 * 
 * 循环过程：
 * i = 5, res = res*x = 1*2 = 2, x = x*x = 2*2 = 4
 * i = 2, res = 2,               x = 4*4 = 16
 * i = 1, res = res*x = 32,      x = x*x = 16*16
 * i = 0 退出循环
 * 
 * @param {any} x 
 * @param {any} n 
 * @returns 
 */

function myPow(x, n) {
  if (n === 0) return 1
  
  var res = 1
  var i = n
  while (i) {
    if (i % 2 !== 0) res *= x
    x *= x

    i = parseInt(i/2)
  }
  return n < 0 ? 1/res : res
}
