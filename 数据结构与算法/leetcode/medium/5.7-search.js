/** 
 * 【分析】
 * 找到数组中的最大值的位置，以此为中心进行分割，得到两个递增数列
 * 众所周知，在有序数列中使用二分法查找元素，时间复杂度为O(log n)
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    var maxIndex = findMax(nums, 0, nums.length-1)
    
    if (target >= nums[0]) return getTargetIndex(nums, target, 0, maxIndex)
    
    return getTargetIndex(nums, target, maxIndex + 1, nums.length - 1)
};

function getTargetIndex(nums, target, l, r) {
    if (l > r) return -1
    
    var mid = parseInt(r - (r-l)/2)
    if (nums[mid] > target) return getTargetIndex(nums, target, l, mid-1)
    if (nums[mid] < target) return getTargetIndex(nums, target, mid+1, r)
    return mid
    
}

function findMax(nums, l, r) {
    if (l === r) return l

    var mid = parseInt(r - (r-l)/2)
    
    // 1. 中间值大于两头值
    if (nums[mid] > nums[l] && nums[mid] > nums[r])
        return findMax(nums, mid, r)
    
    // 2. 中间值小于两头值
    if (nums[mid] < nums[l] && nums[mid] < nums[r])
        return findMax(nums, l, mid)
    
    // 3. 升序排列
    if (nums[mid] > nums[l] && nums[mid] < nums[r])
        return findMax(nums, mid, r)
    
    // 最后剩下1个或两个值
    return nums[mid] >= nums[r] ? mid : mid + 1
}