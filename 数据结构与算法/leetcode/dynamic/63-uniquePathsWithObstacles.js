/**
 * 63 不同路径ii
 * https://leetcode-cn.com/problems/unique-paths-ii/
 */

function uniquePathsWithObstacles(obstacleGrids) {
  var row = obstacleGrids.length
  var col = obstacleGrids[0].length
  if (obstacleGrids[0][0] === 1) return 0

  var res = Array(row).fill(0).map(() => Array(col).fill(0))
  res[0][0] = 1

  for (var i = 0; i < row; ++i) {
    for (var j = 0; j < col; ++j) {
      if (obstacleGrids[i][j] === 1) {
        res[i][j] = 0
        continue
      }
      if (i >= 1) res[i][j] += res[i-1][j]
      if (j >= 1) res[i][j] += res[i][j-1]
    }
  }

  return res[row-1][col-1]
}