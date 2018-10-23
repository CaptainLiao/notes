/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
/**
 * Return an array of size *returnSize.
 * Note: The returned array must be malloced, assume caller calls free().
 */

int getTreeSize(struct TreeNode *root) {
  if (!root) return 0;

  return getTreeSize(root->left) + getTreeSize(root->right) + 1;
}

void inorder(struct TreeNode *root, int *res, int *i) {
  if (!root) return;

  inorder(root->left, res, i);
  // why？为什么不能使用 *res = root->val; ++res; 对res进行赋值
  res[(*i)++] = root->val;
  inorder(root->right, res, i);
}

int *inorderTraversal(struct TreeNode *root, int *returnSize) {
  *returnSize = getTreeSize(root);
  int i = 0;
  // 向操作系统申请 *returnSize 个 int 大小的内存
  // 用于存储最后的结果
  int *res = (int *)malloc(*returnSize * sizeof(int));

  inorder(root, res, &i);
  return res;
}
