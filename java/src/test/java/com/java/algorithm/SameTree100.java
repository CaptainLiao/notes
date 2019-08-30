package com.java.algorithm;

public class SameTree100 {
  private List<Integer> walkTree(TreeNode tree, List<Integer> arr) {
    if (tree != null) {
      arr.add(tree.val);
      walkTree(tree.left, arr);
      walkTree(tree.right, arr);
    }

    return arr;

  }
  public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null || q == null) return false;

    List<Integer> arr1 = new ArrayList();
    List<Integer> arr2 = new ArrayList();

    arr1 = walkTree(p, arr1);
    arr2 = walkTree(p, arr2);

    for(int i: arr1) System.out.println(i);

    return arr1.;
  }
}
