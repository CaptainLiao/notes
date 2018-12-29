/**

给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。

示例:
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */

// 第一步：
//   不妨假设前 m x n 项结果已知且最优，那么第 m x n 项的最优结果为：
//   fn(m,n) = Math.min(fn(m, n-1), fn(m-1, n)) + grid[m][n]
//   又已知，fn(0, i) = grid[0][0] + ... + grid[0][i], fn(i, 0) = grid[0][0] + ... + grid[i][0]

// 第二步：根据上面的递推公式，计算每个位置的最优解，注意处理边界
var minPathSum = function(grid) {
    var m = grid.length - 1
    var n = grid[0].length - 1

    if (m < 0) return 0

    for (var i = 0; i <= m; ++i) {
      for (var j = 0; j <= n; ++j) {
        var topV = i === 0 ? 0 : grid[i-1][j]
        var leftV = j === 0 ? 0 : grid[i][j-1]
        var preV = i === 0 || j === 0
          ? topV + leftV
          : Math.min(topV, leftV)
        
        grid[i][j] = preV + grid[i][j]
      }
    }

    return grid[m][n]
};