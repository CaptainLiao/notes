
function maximalSquare(matrix) {
  var row = matrix.length
  if (row === 0) return 0
  var col = matrix[0].length

  var dp = Array(row + 1).fill(0).map(() => Array(col+1).fill(0))
  var max = 0

  for (var i = 1; i < row; ++i) {
    for (var j = 1; j < col; ++j) {
      if (matrix[i][j] === 1) {
        dp[i][j] = 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
        max = Math.max(max, dp[i][j])
      }
    }
  }

  return max*max
}
