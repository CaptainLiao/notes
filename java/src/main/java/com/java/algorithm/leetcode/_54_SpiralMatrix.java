package com.java.algorithm.leetcode;


import java.util.ArrayList;
import java.util.List;

public class _54_SpiralMatrix {
  public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> arr = new ArrayList<>();

    int row = matrix.length;
    if (row == 0) return arr;
    int col = matrix[0].length;

    int top = 0;
    int right = col - 1;
    int bottom = row - 1;
    int left = 0;

    int num = 0;
    int total = row * col;

    int[] res = new int[total];
    while(num < total) {
      for (int i = left; i <= right; ++i) res[num++] = matrix[top][i];
      // 防止越界
      if (num >= total) break;
      ++top;

      for (int i = top; i <= bottom; ++i) res[num++] = matrix[i][right];
      if (num >= total) break;
      --right;

      for (int i = right; i >= left; --i) res[num++] = matrix[bottom][i];
      if (num >= total) break;
      --bottom;

      for (int i = bottom; i >= top; --i) res[num++] = matrix[i][left];
      if (num >= total) break;
      ++left;
    }

    for (int i : res) arr.add(i);
    return arr;
  }
}
