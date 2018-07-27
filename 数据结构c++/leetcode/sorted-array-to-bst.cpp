
//将有序数组转换为二叉搜索树
//https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/description/

typedef struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;

  TreeNode(int v): val(v), left(NULL), left(NULL) {};
};

class Solution {
private:
  TreeNode* insert(vector<int> nums, int l, int r) {
    if( l > r ) return NULL;

    int mid = r - (r - l)/2;
    TreeNode* root = new TreeNode(nums[mid]);
    root->left = insert(nums, l, mid - 1);
    root->right = insert(nums, mid + 1, r);
    return root;
  }
public:
  TreeNode* sortedArrayToBST(vector<int> &nums) {
    int sz = nums.size();
    if(sz == 0) return NULL;

    return insert(nums, 0, sz - 1);
  }
}
