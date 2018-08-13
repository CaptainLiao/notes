/**
最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

示例 1:
输入: ["flower","flow","flight"]
输出: "fl"

示例 2:
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。

说明:
所有输入只包含小写字母 a-z 
*/

string longCommonPrefix (vector<string> strs) {
  string res = "";
  int sz = strs.size();
  if (sz == 0) return res;
  if (sz == 1) return strs[0];

  string s1 = strs[0];
  for (int i = 0; i < s1.length(); ++i) {
    for (int j = 1; j < sz; ++j) {
      if (s1[i] != strs[j][i]) return res;
    }
    res += s1[i];
  }
  return res;
}
