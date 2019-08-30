package com.java.algorithm.leetcode;

public class _100SameTree {

  private class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(TreeNode left, int val, TreeNode right) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }

  public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;

    if (p != null || q != null) return false;

    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
}
