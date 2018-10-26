
/**
 * 
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

/**
 * 【分析】
 * 1、前序序列第一个节点，就是二叉树的根节点；
 * 2、在中序序列中找到该节点，位于该节点左侧的是根节点的左子树，位于该节点右侧的是根节点的右子树；
 * 3、根据左右子树的节点数量，可以在前序序列中找到根节点左右子树的前序序列；
 *    例如：
 *       假设左子树节点数为3，那么在前序序列中，从第二个节点开始往后数3位，这段范围内的节点组成的序列，就是左子树的前序序列；
 *       相应的，剩余的节点就是右子树的前序序列。
 * 4、递归实现上面的过程
 */

let buildTree = function (preorder, inorder) {
  let root = preorder[0];
  let index = inorder.indexOf(root);
  
  if (!root) return null;

  let res = new TreeNode(root);
  res.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index));
  res.right = buildTree(preorder.slice(index+1), inorder.slice(index+1));

  return res;
}
