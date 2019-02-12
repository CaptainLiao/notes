/**
 *
编写一个程序，找出第 n 个丑数。

丑数就是只包含质因数 2, 3, 5 的正整数。

示例:
输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
说明:  
1 是丑数。
n 不超过1690。

l1: 1x2, 2x2,3x2,4x2,5x2,6x2,8x2,9x2,10x2,12x2,
l2: 1x3, 2x3,3x3,4x3,5x3,6x3,8x3,9x3,10x3,12x3,
l3: 1x5, 2x5,3x5,4x5,5x5,6x5,8x5,9x5,10x5,12x5,
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  var i = j = k = 0
  var count = 1
  var res = [1]

  while (count < n) {
    var temp = [res[i]*2, res[j]*3, res[k]*5]
    var min = Math.min(...temp)

    res[count++] = min

    if (temp[0] === min) ++i
    if (temp[1] === min) ++j
    if (temp[2] === min) ++k
  }
  
  return res[--count]
};

var nthUglyNumber = function(n) {
  var i = j = k = 0
  var count = 1
  var res = [1]
  
  while (count < n) {
    var temp = [res[i]*2, res[j]*3, res[k]*5]
    var min = Math.min(...temp)
    
    if (min === temp[0]) {
        ++i
    } else if (min === temp[1]) {
        ++j
    } else {
        ++k
    }
   
    if (min != res[count-1]) res[count++] = min
  }

  return res[--count]
};