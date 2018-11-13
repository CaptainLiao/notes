
/**
 * 在排序数组中查找元素的第一个和最后一个位置
 * 
 * [分析]
 * 使用两次二分查找
 * 第一次：查找target出现的第一个位置
 * 第二次：查找target出现的最后一个位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  var res = [-1, -1]
  if(!nums || !nums.length) return res
  
  res[0] = binarySearch(nums, target, true)
  res[1] = binarySearch(nums, target)

  return res 
}

/**
 * binarySearch 二分搜索查找
 * @param {number[]} arr 
 * @param {number} target 
 * @param {boolean} isSearchFirst true 查找出现的第一个位置，false 查找出现的最后一个位置
 * @return {number} 找到了返回对应的下标，否则返回-1
 */
function binarySearch(arr, target, isSearchFirst) {
  var left = 0
  var right = arr.length - 1
  // 返回的结果下标
  var res = -1

  while (left <= right) {
    var mid = parseInt(right - (right-left)/2)
    if (target === arr[mid]) {
      res = mid
      if (isSearchFirst) {
        // 继续向左部分进行二分查找
        right = mid - 1
      } else {
        // 继续向右部分进行二分查找
        left = mid + 1
      }
    } else if (target > arr[mid]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return res
}


// 改进
// 1、如果第一次查找返回-1，说明没有这个元素，就无需进行第二次查找了
// 2、若target存在，注意两次查找都是从0开始的，
//    因为第一次查找会返回target出现的第一个位置index，那么第二次只需从index+1处开始向后查找