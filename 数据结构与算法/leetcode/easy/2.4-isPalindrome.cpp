/**
验证回文字符串
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。
示例 1:
输入: "A man, a plan, a canal: Panama"
输出: true

示例 2:
输入: "race a car"
输出: false
*/

bool isPalindrome(string s) {
  int len = s.length();
  if (len == 0) return true;

  int i = 0;
  int j = len - 1;
  while (i < j) {
    while (!isalnum(s[i])) ++i;
    while (!isalnum(s[j])) --j;

    if (i > j) break;

    if (s[i] >= 'A' && s[i] <= 'Z')
      s[i] += 32;
    if (s[j] >= 'A' && s[j] <= 'Z')
      s[j] += 32;
    
    if (s[i] != s[j]) return false;
    ++i;
    --j;
  }
  return true;
}
