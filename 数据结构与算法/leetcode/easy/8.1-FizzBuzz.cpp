/**
Fizz Buzz: https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/25/math/60/
写一个程序，输出从 1 到 n 数字的字符串表示。

1. 如果 n 是3的倍数，输出“Fizz”；

2. 如果 n 是5的倍数，输出“Buzz”；

3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。

示例：

n = 15,

返回:
[
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz"
]
*/

// 除了以 O(n) 的时间复杂度解决，还可以使用双指针使时间复杂度降低到 O(lg n)
vector<string> fizzBuzz (int n) {
  vector<string> res;
  int i = 1;

  while (i <= n) {
    bool isMulThree = i % 3 == 0;
    bool isMulFive = i % 5 == 0;

    if (isMulFive && isMulThree)
      res.push_back("FizzBuzz");
    else if (isMulThree)
      res.push_back('Fizz');
    else if (isMulFive)
      res.push_back("Buzz");  
    else
      res.push_back(to_string(i));
  }

  return res;
}
