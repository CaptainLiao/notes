/**
  汉明距离：
    对两个字符串进行异或运算，结果中1的个数就是韩明距离。
    它表示两个（相同长度）字对应位不同的数量，使用在数据传输差错控制编码里面。
*/

int hammingDistance(int x, int y) {
  int i = x ^ y;
  int count = 0;
  while (i != 0) {
    count++;
    i = i & (i-1);
  }
  return count;
}
