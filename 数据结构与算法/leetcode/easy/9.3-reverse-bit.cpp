/**
  颠倒二进制：https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/26/others/66/

  颠倒给定的 32 位无符号整数的二进制位。
*/


uint32_t reverseBits(uint32_t n) {
  uint32_t m=0;
  int i = 32;
  while (i-- > 0){
      m = m<<1;//m向左移1位；
      m = m|(n & 1);//m的末位设置为n的末位
      n = n>>1;//n向右移1位
  }
  return m;
}
