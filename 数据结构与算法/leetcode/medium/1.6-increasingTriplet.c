/**
递增的三元子序列
  给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。

数学表达式如下:

如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。
说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。

示例 1:
输入: [1,2,3,4,5]
输出: true

示例 2:
输入: [5,4,3,2,1]
输出: false
*/

/**
题目求一个递增三元子序列，假设我们已经找到两个数（m1,m2）是递增的，那么再找到最后一个数就解题了

那么，如何使 m1,m2递增呢？
1、初始化m1,m2为最大值
2、遍历数组，假设当前遍历到的数值为 a
  2.1 如果 a <=m1,则将a赋值给m1;
  2.2 否则，如果当 a <=m2,则将a赋值给m2;
这样，就能保证 m1 < m2

如何找到最后一个数呢？
显然，当a不满足2.1和2.2的条件时，它就是最后那一个数。
*/

bool increasingTriplet(int *nums, int numsSize) {
  int m1 = ((unsigned)-1) >> 1;
  int m2 = m1;
  int i;

  for (i = 0; i < numsSize; ++i) {
    if (nums[i] <= m1)
      m1 = nums[i];
    else if (nums[i] <= m2)
      m2 = nums[i];
    else
      return true;
  }
  
  return false;
}