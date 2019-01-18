/**
 * 152.乘积最大子序列
 * 
给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。
示例 1:
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。

示例 2:
输入: [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

5,-1,8,6,-10
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct1 = function(nums) {
    var res = [nums[0]]
    for (var i = 1; i < nums.length; ++i) {
      var cur = nums[i]
      var max = cur
      for (var j = i - 1; j >= 0; --j) {
        cur *= nums[j]
        if (cur > max) max = cur
      }
      res[i] = max
    }

    return ~~Math.max(...res)
};

var maxProduct2 = function(nums) {
  var b = nums.reverse()
  for (var i = 1; i < nums.length; ++i) {
    nums[i] *= nums[i-1]
    b[i] *= b[i-1]
  }
  return Math.max(...nums, ...b)
}

var maxProduct = function (nums) {
  var len = nums.length
  if (len === 0) return 0

  var res = nums[0]
  var max = 1
  var min = 1
  for (var i = 0; i < len; ++i) {
    if (nums[i] < 0) {
      var temp = max
      max = min
      min = temp
    }

    max = Math.max(max*nums[i], nums[i])
    min = Math.min(min*nums[i], nums[i])
    res = Math.max(res, max)
  }
  return res
}

