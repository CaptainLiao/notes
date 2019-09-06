package com.java.algorithm.leetcode;

public class _53_MaximumSubarray {
  public int maxSubArray(int[] arr) {
    int sum = arr[0];
    int max = sum;

    for(int n : arr) {
      if (sum < 0) sum = 0;
      sum += n;
      max = Math.max(max, sum);
    }

    return max;
  }
}
