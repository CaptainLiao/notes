/**
  数数并说https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/39/
报数序列是指一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：
1.     1
2.     11
3.     21
4.     1211
5.     111221
1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

给定一个正整数 n ，输出报数序列的第 n 项。
注意：整数顺序将表示为一个字符串。

示例 1:
输入: 1
输出: "1"

示例 2:
输入: 4
输出: "1211"
*/

string countAndSay(int n) {
  string s = "1";
  for (int i = 0; i < n-1; ++i) {
    int sz = s.size();
    int count = 1;
    string temp = "";

    for (int j = 0; j < sz; ++j) {
      if (j + 1 >= sz) 
        temp += to_string(count) + s[sz-1];
      else if (s[j] == s[j+1])
        ++count;
      else {
        temp += to_string(count) + s[j];
        count = 1;
      }
    }
    s = temp;
  }
  return s;
}
