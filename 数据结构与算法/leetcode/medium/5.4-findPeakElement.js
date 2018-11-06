/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  var l = 0
  var r = nums.length - 1

  while (l < r) {
    var mid = parseInt(r - (r-l)/2)
    if (nums[mid] < nums[mid+1]) {
      l = mid + 1
    } else {
      r = mid
    }
  }
  return l
}