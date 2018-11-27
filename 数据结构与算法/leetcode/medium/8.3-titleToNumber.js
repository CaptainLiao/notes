/**
 * Excel表列序号
给定一个Excel表格中的列名称，返回其相应的列序号。
https://leetcode-cn.com/explore/interview/card/top-interview-questions-medium/53/math/114/
 */
var titleToNumber = function(s) {
  var res = 0
  for (var v of s) {
    res = res*26 + v.charCodeAt() - 64
  }
  return res
}