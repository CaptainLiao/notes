/**
 * 二叉搜索树中第K小的元素
给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

说明：
你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */

/**
 * 【分析】
 * 解法一：
 *    根据二叉搜索树的特性，经过一次中序遍历后，可得到一组递增的值；
 *    用一维数组保存中序遍历的结果，那么，数组中第k-1项的值，就是二叉搜索树中第K小的元素。
 */

function kthSmallest(root, k) {
  if (!root) throw new Error('根节点不能为空！');

  let arr = [];
  inorder(root);
  return arr[k-1];

  function inorder(root) {
    if (!root) return;
    inorder(root.left);
    arr.push(root.val);
    inorder(root.right);
  }
} 
