
var lengthOfLIS = function(nums) {
  if (!nums || !nums.length) return 0

  var dp = [1]
  for (var i = 1; i < nums.length; ++i) {
    var maxIndex = 0
    var hasFindMax = false
    for (var j = 0; j < i; ++j) {
      if (nums[i] > nums[j] && dp[j] >= dp[maxIndex]) {
        maxIndex = j
        hasFindMax = true
      }
    }
    dp[i] = hasFindMax ? 1 + dp[maxIndex] : 1
  }

  return Math.max(...dp)
}