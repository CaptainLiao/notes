/**
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

 */

/**
 * 根据回文字符串镜面对称的特点，可以
 * 枚举字符串，以下标 i 为中心向左右两侧搜索，如果对应的字符相等则继续搜索，否则进行下一轮循环
 * 需要注意的是，对奇、偶回文子串的处理
 */
function longestPalindrome(s) {
  var len = s.length
  var start = 0
  var end = 0

  for(var i = 1; i < len; ++i) {
    // 偶回文子串
    calculatePalindromeIndex(s, i - 1, i)
    // 奇回文子串
    calculatePalindromeIndex(s, i - 1, i + 1)
  }

  return s.slice(start, end+1)

  function calculatePalindromeIndex(s, left, right) {
    while (left >= 0 && right < len) {
      if (s[left] !== s[right]) {
        break;
      } else {
        if (right - left >= end - start) {
          start = left
          end = right
        }
      }
      --left
      ++right
    }
  }
}
