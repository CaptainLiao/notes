/**
* 二叉树的层次遍历
* https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/
*/

class solution {
public:
  vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> v;

    if(root == NULL) return v;

    queue<TreeNode*> q;
    q.push(root);

    TreeNode* temp;
    
    while( !p.empty() ) {
      int s = p.size();
      vector<int> a;
      
      for( int i = 0; i < s; ++i ) {
        temp = s.front();
        s.pop();
        a.push_back(temp->val);

        if(temp->left) q.push(temp->left);
        if(temp->right) q.push(temp->right);
      }
      v.push_back(a);
    }
    return v;
  }

}