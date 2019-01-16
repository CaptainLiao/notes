/**
 * 120. 三角形最小路径和
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  var row = triangle.length
  if (row === 0) return 0
  
  for (var i = 1; i < row; ++i) {
      var pre = triangle[i-1]
      var cur = triangle[i]
      var curL = cur.length
      
      for (var j = 0; j < curL; ++j) {
          if (j === 0) {
              cur[j] += pre[j]
          } else if(j === curL - 1){
              cur[j] += pre[j-1]
          } else {
              cur[j] += Math.min(pre[j-1], pre[j])
          }
          
      }
  }

  return Math.min(...triangle[row-1])
};