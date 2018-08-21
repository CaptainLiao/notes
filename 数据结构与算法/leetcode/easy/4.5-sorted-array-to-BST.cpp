/**
将有序数组转换为二叉搜索树
将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:
给定有序数组: [-10,-3,0,5,9],
一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
*/

class Solution1 {
  private:
    TreeNode* insert(vector<int> &nums, int left, int right) {
      if (left > right) return;

      int mid = right - (right-left)/2;
      TreeNode* root = new TreeNode(nums[mid]);
      root->left = insert(nums, left, mid-1);
      root->right = insert(nums, mid+2, right);
      return root;
    }
  public:
    TreeNode* sortedArrayToBST(vector<int> &nums) {
      if (nums.empty()) return NULL;
      return insert(nums, 0, nums.size()-1);
    }
}


/**
二、将一个数组（乱序）转化为平衡二叉树
*/
class Solution {
  private:
    getHeight(TreeNode* root) {
      if (root == NULL) return 0;
      return max(getHeight(root->left), getHeight(root->right)) + 1;
    }

    TreeNode* leftLeft(TreeNode* root) {
      TreeNode* temp = root->left;
      root->left = temp->right;
      temp->right = root;
      return temp;
    }
    
    TreeNode* rightRight(TreeNode* root) {
      TreeNode* temp = root->right;
      root->right = temp->left;
      temp->left = root;
      return temp;
    }

    TreeNode* leftRight(TreeNode* root) {
      rightRight(root->left);
      return leftLeft(root);
    }

    TreeNode* rightLeft(TreeNode* root) {
      leftLeft(root->right);
      return rightRight(root);
    }

    void insert(TreeNode*& root, int val) {
      if (root == NULL)
        root = new TreeNode(val);

      if (val < root->val) {
        insert(root->left, val);

        if (getHeight(root->left) - getHeight(root->right) > 1) {
          if (val < root->left->val) {
            root = leftLeft(root);
          } else {
            root = leftRight(root);
          }
        }
      } else {
        insert(root->right, val);

        if (getHeight(root->right) - getHeight(root->left) > 1) {
          if (val > root->right->val) {
            root = rightRight(root);
          } else {
            root = rightLeft(root);
          }
        }
      }

    }

  public:
    TreeNode* arrayToBST(vector<int>& nums) {
      if (nums.empty()) return NULL;
      
      TreeNode* root;
      int sz = nums.size() - 1;
      for(int i = 0; i < sz; ++i) {
        insert(root, nums[i]);
      }
      return root;
    }
}

