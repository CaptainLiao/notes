
function snakeMatrix(n) {
  // 设置一个 n*n 的矩阵
  let matrix = Array(n).fill().map(v => v = Array(n).fill())
  __partition(matrix, 0, 0, 1, n)
  return matrix
}

function __partition(arr, x, y, start, n) {
  // 递归边界
  if( n <= 0 ) return
  if( n === 1 ) {
    arr[x][y] = start
    return
  }

  // 取得 4 条边的数
  let i = x
  let j = y
  
  for(; i < x + n - 1; i++) // 上边
    arr[j][i] = start++

  for(; j < y + n - 1; j++) // 右边
    arr[j][i] = start++

  for(i = x + n - 1; i > x; i--) // 下边
    arr[j][i] = start++

  for(j = y + n - 1; j > y; j--) // 左边
    arr[j][i] = start++

  __partition(arr, x+1, y+1, start, n-2)
}

console.log(snakeMatrix(8))
