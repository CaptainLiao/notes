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

void inorder2(struct TreeNode *root, int **res) {
  if (!root) return;

  inorder(root->left, res);
  *(*res) = root->val;
  (*res)++;
  inorder(root->right, res);
}

int *inorderTraversal(struct TreeNode *root, int *returnSize) {
  *returnSize = getTreeSize(root);
  int *res = (int *)malloc(*returnSize * sizeof(int));
  int *result = res;

  inorder2(root, res);
  return result;
}

