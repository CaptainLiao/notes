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

template <class T>
AVLTreeNode<T> *AVLTree<T>::leftLeft(AVLTreeNode<T>* k2)
{
  AVLTreeNode* k1 = k2->left;
  k2->left = k1->right;
  k1->right = k2;
  return k1;
}
AVLTreeNode<T> *AVLTree<T>::rightRight(AVLTreeNode<T>* k2)
{
  AVLTreeNode* k1 = k2->right;
  k2->right = k1->left;
  k1->left = k2;
  return k1;
}
AVLTreeNode<T>* AVLTree<T>::leftRight(AVLTreeNode<T>* k3)
{
  k3->left = rightRight(k3->left);
  return leftLeft(k3);
}
AVLTreeNode<T>* AVLTree<T>::rightLeft(AVLTreeNode<T>* k3)
{
  k3->right = leftLeft(k3->right);
  return rightRight(k3);
}

template <class T>
AVLTreeNode<T> * AVLTree<T>::insert(AVLTreeNode<T>* &tree, T key)
{
  if( tree == NULL ) {
    tree = new AVLTreeNode( key, NULL, NULL );
    if( tree == NULL ){
      throw "ERROR: create avltree node failed!";
    }
    return tree;
  }

  if( key < tree->key )
  {
    tree->left = insert(tree->left, key);
    // 因为向左子树插入一个节点，所以用左子树减右子树
    if( tree->left->height - tree->right->height == 2)
    {
      if( key < tree->left->key)
        tree = leftLeft(tree);
      else
        tree = leftRight(tree);
    }
  } 
  else if( key > tree->key )
  {
    tree = insert(tree->right, key);
    // 向右子树插入节点，用右子树的高度-左子树的高度
    if( tree->right->height - tree->left->height == 2)
    {
      if( key < tree->right->key )
        tree = rightLeft(tree);
      else
        tree = rightRight(tree);
    }
  }

  tree->height = max(tree->left->height, tree->right->height) + 1;
  return tree;


  //
  // if(root == NULL) {
  //   return new AVLTreeNode(key, NULL, NULL)
  // }
  // if( key < tree->key ) {
  //   tree->left = insert(tree->left, key);
  // } else if( key > tree->key ) {
  //   tree->right = insert(tree->right, key);
  // } else {
  //   //
  // }
}
