package com.java.algorithm.leetcode;

/**
 * 此题和【54 打印螺旋矩阵】思路一致
 *
 * 采用夹边法，顺时针从外层向内层遍历
 * */
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
      right--;

      for (i = right; i >= left; --i) res[bottom][i] = num++;
      bottom--;

      for (i = bottom; i >= top; --i) res[i][left] = num++;
      left++;
    }

    return res;
  }
}
