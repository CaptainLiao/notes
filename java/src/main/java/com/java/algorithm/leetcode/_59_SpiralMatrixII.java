package com.java.algorithm.leetcode;

public class _59_SpiralMatrixII {
  public int[][] generateMatrix(int n) {
    int[][] res = new int[n][n];

    int top = 0;
    int right = n - 1;
    int bottom = n -1;
    int left = 0;

    int i = 0;
    int num = 1;
    int target = n*n;
    while (num <= target) {
      for (i = left; i <= right; ++i) res[top][i] = num++;
      top++;

      for (i = top; i <= bottom; ++i) res[i][right] = num++;
      right++;

      for (i = right; i >= left; --i) res[bottom][i] = num++;
      bottom--;

      for (i = bottom; i >= top; --i) res[i][left] = num++;
      left--;
    }

    return res;
  }
}
