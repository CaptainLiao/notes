var numArray = function(nums) {
  this.nums = nums
  for (var i = 1; i < nums.length; ++i) {
    this.nums[i] = this.num[i-1] + nums[i]
  }
}

numArray.prototype.sumArray = function(i, j) {
  return i === 0 ? this.nums[j] : this.nums[j] - this.nums[i-1]
}