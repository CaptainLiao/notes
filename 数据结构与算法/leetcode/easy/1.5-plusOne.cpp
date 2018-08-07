/**
加一


给定一个非负整数组成的非空数组，在该数的基础上加一，返回一个新的数组。
最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。

示例 2:
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
*/

class Solution {
  public:
    vector<int> plusOne(vector<int>& digit) {
      vector<int> res;
      if( digit.empty() ) return res;

      int sz = digit.size() - 1;
      int t = 0;
      int k = 0;

      while( sz >= 0) {
        t = digit[sz] + 1 + k;
        if( t >= 10 ) {
          t = t - 10;
          k = 1;
        } else {
          k = 0;
        }
        res.insert(res.begin(), t);
        --sz;
      }
      if( k != 0 ) 
        res.insert(res.begin(), k);
    }
    return res;
}
