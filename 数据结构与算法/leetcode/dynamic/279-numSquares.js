// not understand

var numSquares = function (n) {
  var dp = Array(n+1).fill(n)
  dp[0] = 0

  for (var i = 1; i <= n; ++i) {
    for (var j = 1; j * j <= i; ++j) {
      dp[i] = j*j === i ? 1 : Math.min(dp[i], dp[j*j] + dp[i - j*j])
    }
  }

  return dp[n]
}