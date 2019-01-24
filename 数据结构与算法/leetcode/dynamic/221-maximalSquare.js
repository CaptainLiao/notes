
function maximalSquare(matrix) {
  var row = matrix.length
  if (row === 0) return 0
  var col = matrix[0].length

  var dp = Array(row).fill(0).map(() => Array(col).fill(0))
  var max = 0

  for (var i = 0; i < row; ++i) {
    for (var j = 0; j < col; ++j) {
      if (i === 0 || j === 0) {
        dp[i][j] = matrix[i][j]
      } else if (matrix[i][j] === 1) {
        dp[i][j] = 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
      }
      max = Math.max(max, dp[i][j])
    }
  }

  return max*max
}
