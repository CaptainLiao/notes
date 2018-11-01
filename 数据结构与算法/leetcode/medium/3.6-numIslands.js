/**
 * 岛屿的个数
 * 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，
 * 并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围
 * 
 */

/**
    【分析】
    求岛屿的数量，本质上是计算二维数组中值为1的连通区域的个数。
    利用dfs，很容易得出答案：
        1、遍历二维数组，
        2、如果它的值为1，则对其上下左右值为1的数进行深度优先遍历，并将访问过的数用visited = true进行标记；
        3、一次深度优先遍历完成，结果值加1；
        4、遍历下一个visited为false的数；
        重复2、3、4。
    
*/

 /**
 * @param {character[][]} grid
 * @return {number}
 */

function numIslands(grid) {
  if (!grid || grid.length === 0) return 0
  
  let row = grid.length
  let col = grid[0].length
  let visited = Array(row).fill([])
    .map(item => item.concat(Array(col).fill(false)))
  let count = 0

  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      if (grid[i][j] === '0' || visited[i][j]) continue;

      dfs(i, j)

      ++count
    }
  }
  return count

  function dfs(i, j) {
    if (
      i >= 0 && i < row
      && j >= 0 && j < col
      && grid[i][j] === '1'
      && !visited[i][j]
    ) {
      dfs(i-1, j) // 上
      dfs(i+1, j) // 下
      dfs(i, j-1) // 左
      dfs(i, j+1) // 右
    }
  }
}