package com.java.algorithm.leetcode;

public class _134_GasStation {
  public int canCompleteCircuit(int[] gas, int[] cost) {
    // 可以转化为求最大最长子串的第一个下标
    int sum = 0;
    int index = 0;
    int total = 0;

    for(int i = 0; i < gas.length; ++i) {
      total += gas[i] - cost[i];
      if (sum > 0) {
        sum += gas[i] - cost[i];
      } else {
        sum = gas[i] - cost[i];
        index = i;
      }
    }

    return total >= 0 ? index : -1;
  }
}
