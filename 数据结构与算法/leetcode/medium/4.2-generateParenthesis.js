/**
 * @param {number} n
 * @return {string[]}
 */
/**
【分析】
    可以将题目拆分成两个子问题：
        生成括号的全排列2n!个；
        去除无效的括号组合。
*/

var generateParenthesis = function(n) {
  var res = []
  dfs(n, n, out, res)
  return res
}

function dfs(left, right, out, res) {
  if (left > right) return
  if (left === 0 && right === 0)
    res.push(out)

  if (left > 0) dfs(left-1, right, out+'(', res)
  if (right > 0) dfs(left, right-1, out+')', res)
}