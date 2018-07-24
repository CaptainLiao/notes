/**
 * 翻转二叉树
 * https://leetcode-cn.com/problems/invert-binary-tree/description/
 */

function invertTree(root) {
  if( root === null ) return root;

  let temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}