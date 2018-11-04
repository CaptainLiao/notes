/**
 * 子集
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
 */

/**
 * [分析]
将当前的返回值由之前的返回值中的每一个元素(即一个子集)加上一个元素后得到，

例如按照例子中所给的nums:
status1:{}    //一开始只有一个空集
status2:{},{1}    //加了1之后
status3:{},{1},{2},{1,2}    //加了2之后
status4:{},{1},{2},{1,2},{3},{1,3},{2,3},{1,2,3}    //加了3之后
--------------------- 
原文：https://blog.csdn.net/Windows_Defender/article/details/80767666 
 * 
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */

function subset(nums) {
  var res = [[]]
  for (var i = 0; i < nums.length; ++i) {
    for (var j = 0, len = res.length; ++j) {
      var temp = [].concat(res[j]).push(nums[i])
      res.push(temp)
    }
  }

  return res
}