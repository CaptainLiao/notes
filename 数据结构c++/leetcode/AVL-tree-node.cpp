// 平衡二叉树

template <class T>
class AVLTreeNode {
public:
  T key;
  int height;
  AVLTreeNode* left;
  AVLTreeNode* right;

  AVLTreeNode( T k, AVLTreeNode* l, AVLTreeNode* r):
    key(k), height(0), left(l), right(r) {};
};

