/**
 颠倒整数
给定一个 32 位有符号整数，将整数中的数字进行反转。

示例 1:
输入: 123
输出: 321

 示例 2:
输入: -123
输出: -321

示例 3:
输入: 120
输出: 21
注意:
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。根据这个假设，如果反转后的整数溢出，则返回 0。
2146473647
-2146473648
*/

class Solution {
public:
    int reverse(int x) {
      string str = x > 0 ? to_string(x) : to_string(-x);
      std::reverse(str.begin(), str.end());

      try {
        return x > 0 ? stoi(str) : stoi("-" + str);
      } catch(std::out_of_range e) {
        return 0;
      }
    }

    int reverse2(int x) {
      bool negative = x < 0;
      if(negative) x = -x;

      int res = 0;
      int temp = 0;
      while(x != 0) {
        temp = temp*10 + x%10;
        if( temp/10 != res )
          return 0;
        res = temp;
        x /= 10;
      }

      if( negative ) res = -res;
      return res;
    }
}
