/**
 * @param {number[]} nums
 * @return {number[][]}
 
 * 【分析】
 * 对长度为n的数组，求以任意元素a开始的排列，操作如下：
 *  1、将元素a放在队首
 *  2、对剩余n-1个元素进行全排列
 *  3、重复1、2步骤，直到剩余元素个数为0，则完成a元素的全排列
 *  
 *  那么，要得到n个元素的全排列，只需重复n次上面的操作。
 */

var permute = function(nums) {
  var res = []
  dfs(nums, 0, nums.length, res)
  return res
};

function dfs(nums, start, len, res) {
  if (start === len - 1)
      return res.push(JSON.parse(JSON.stringify(nums)))
  
  // 重复n次
  for (var i = start; i < len; ++i) {
      // 将当前元素nums[i]和剩余元素的第一个元素nums[start]进行交换
      swap(nums, i, start)
      
      // 对剩余元素进行全排列
      dfs(nums, start+1, len, res)
      
      // 一次全排列完成，需要将元素交换回原来位置
      swap(nums, i, start)
  }
}

function swap(nums, i, j) {
  var t = nums[i]
  nums[i] = nums[j]
  nums[j] = t
}