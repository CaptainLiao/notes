package com.java.algorithm.leetcode;

public class _437_PathSumIII {
  public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
  }

  public int pathSum(TreeNode root, int sum) {
    if (root == null) return 0;

    return path(root, sum)
        + pathSum(root.left, sum)
        + pathSum(root.right, sum);
  }

  private int path(TreeNode root, int sum) {
    if (root == null) return 0;

    int res = 0;
    if (root.val == sum) ++res;

    res += path(root.left, sum - root.val);
    res += path(root.right, sum - root.val);

    return res;
  }
}
