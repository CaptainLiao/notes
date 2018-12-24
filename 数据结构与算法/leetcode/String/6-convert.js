/**
 * 6 z 字变换
 * https://leetcode-cn.com/problems/zigzag-conversion/
 */

function conversion(s, numRows) {
  if (numRows === 1) return s

  var res = []
  var col = 0
  var count = 0
  var len = s.length
  var n = numRows - 1

  while (count < len) {
    var row = 0
    var t = col % n

    if (t === 0) {
      while (row <= n && count < len) {
        if (!res[row]) res[row] = ''
        res[row++] += s[count++]
      }
    } else {
      if (!res[n-t]) res[n-t] = ''
      res[n-t] += s[count++]
    }
    ++col
  }

  return s.join('')
}