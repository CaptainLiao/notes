/**
 * https://leetcode-cn.com/problems/find-and-replace-pattern/
 * 
 * 将字符串转化为数字串后进行匹配，其中某个数字对应字符在字符串中出现的第一个位置
 * 
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */

var findAndReplacePattern = function(words, pattern) {
  var p = getPattern(pattern)
  return words.filter(word => getPattern(word) === p)
}

function getPattern(word) {
  var res = ''
  var o = {}

  var t
  for (var i = word.length - 1; i >= 0; --i) {
    t = word[i]
    if (!o[t]) o[t] = i
    res += o[t]
  }
}