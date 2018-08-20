/**
验证二叉搜索树: https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/7/trees/48/
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：
节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
*/


/**
解法一：时间复杂度O(n/2)，空间复杂度为O(n)，其中n为节点数
  对二叉树进行中序遍历，将每个节点值存入数组中；
  遍历数组，若数组升序排列，返回ture，否则返回false
*/
class Solution {
private:
  vector<int> vec;
  void __midOreder (TreeNode* root) {
    if (root == NULL) return;

    __midOreder(root->left);
    vec.push_back(root->val);
    __midOreder(root->right);
  };

public:
  bool isValideBST (TreeNode* root) {
    __midOreder(root);

    if (vec.empty()) return true;

    for (int i = 0; i <= sz/2; ++i) {
      if (vec[i] <= vec[i-1] || vec[sz-i] <= vec[sz-i-1])
        return false;
    }

    return true;
  }
}

/**
解法二：由于二叉树天然的递归性质，我们可以使用递归解决

  一颗有效二叉树满足当前节点值小于右子树，大于左子树，这句话可以这么理解：
    1、如果当前节点为左孩子，则它小于父节点
    2、如果当前节点为有孩子，则它大于父节点
  所以，我们使用 min，max来【动态】保存一个最小值和一个最大值，利用上面的规则，若满足：
    若当前节点为左孩子，并且它小于 min；
    若当前节点为右孩子，并且它大于 max;
  则当前节点为有效节点，那么对下一个节点进行比较，并改变 min、max，否则返回false。

*/
class Solution {
public:
  bool isValideBST (TreeNode* root, int min, int max) {
    if (root == NULL) return true;
    if (root->val <= min || root->val >= max) return false;
    return isValideBST(root->left, min, root->val) && isValideBST(root->right, root->val, max) 
  }
}
