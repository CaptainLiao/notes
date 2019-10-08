public class A {
  public int longestUnivaluePath(TreeNode root) {
    if (root == null) return 0;

    return Math.max(
      path(root.left, root.val) + path(root.right, root.val),
      Math.max(longestUnivaluePath(root.left), longestUnivaluePath(root.right))
    );
  }

  private int path(TreeNode root, int val) {
    if (root == null || root.val != val) return 0;

    return 1 + Math.max(path(root.left, val), path(root.right, val));
  }
}