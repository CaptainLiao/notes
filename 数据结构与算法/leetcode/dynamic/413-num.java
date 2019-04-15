class Solution {
  public int numberOfArithmeticSlices(int[] A) {
      int len = A.length;
      int sum = 0;
      int temp = 0;
      for (int i = 2; i < len; ++i) {
          if (A[i] - A[i-1] == A[i-1] - A[i-2]) {
              ++temp;
              sum += temp;
          } else {
              temp = 0;
          }
      }
      return sum;
  }
}