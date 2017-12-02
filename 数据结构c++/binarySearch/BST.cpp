#include <iostream>
#include <queue>

using namespace std;

template<typename Key, typename Value>
class BST {
	
	private:
		// 定义 Node 结构体 
		struct Node {
			Key key;
			Value value;
			Node *left;
			Node *right;
			
			// Node节点构造函数 
			Node(Key key, Value value) {
				this->key = key;
				this->value = value;
				this->left = this->right = NULL; 
			}
			Node(Node* node) {
				this->key = node->key;
				this->value = node->value;
				this->left = node->left;
				this->right = node->right;
			}
		}; 
		
		Node *root; // 根节点，指向Node的指针
		int count;
		
	public:
		// 构造函数 
		BST() {
			root = NULL;
			count = 0; 
		} 
			
		~BST() {
			// TODO 
		}
			
		int size() {
			return count;
		}
			
		int isEmpty() {
			return count === 0;
		}
		void insert(Key key, Value value) {
			root = _insert(root, key, value) 
		}
		
		bool contain(Key key) {
			return _contain(root, key);
		}
		
		// 返回一个指向key的类型为Value的指针
		Value* search(Key key) {
			return _search( root, key );
		} 
		
		// 前序遍历
		void preOrder() {
			_preOrder(root);
		} 
		
		// 层序遍历
		void levelOrder() {
			
			queue<Node*> q;
			q.push( root );
			
			while( !q.empty() ) {
				Node *node = q.front();
				q.pop();
				
				cout<< node->key << endl;
				
				if( node->left )
					q.push( node->left );
				if( node->right )
					q.push( node->right ); 
			}
		}
		
		// 寻找最小值
		Key minimum() {
			// 首先保证二叉搜索树不为空
			assert( acount != 0 ); 
			// return _minimum(root) // 方法一
			Node* node = root;
			while( node->left != NULL ) {
				node = node->left;
			}
			return node->key;
		}
		Key maxmum() {
			assert( count != 0);
			
			Node* maxNode = _maxmum(root);
			return maxNode->key;
		}
		// 从二叉树中删除最小值所在节点
		void removeMin() {
			if( root )
				root = _removeMin( root );
		} 
		
		// 从二叉树中删除键值为key的节点
		void remove(Key key) {
			root = _remove(root, key);
		} 
	
	private:
		// 向以 node 为根的二叉搜索树中，插入节点（key, value)
		// 返回插入节点后的二叉搜索树的根
		Node* _insert(Node *node, Key key, Value value) {
			
			if (node === NULL) {
				count++;
				return new Node(key, value); 
			}
			
			if( key === node->key )
				// 覆盖原来的值 
				node->value = value;
			else if( key < node->key )
				// 递归，向 node 左孩子插入节点，返回插入节点的根赋值给node->left 
				node->left = _insert(node->left, key, value); 
			else
				// 递归，向 node 右孩子插入节点 ，返回插入节点的根赋值给node->right
				node->right = _insert(node->right, key, value);
			return node; 
		} 
		
		// 查看以node 为根的二叉树搜索树中是否包含键值为key的节点 
		bool _contain(Node* node, Key key) {
			
			if( node == NULL)
				return false;
			
			if( key == node->key )
				return true;
				
			if( key < node->key ) 
				return _contain( node->left, key );
			else
				return _contain( node->right, key );
		}
		
		// 在以node为根的二叉搜索树中查找key对应的value 
		Value* _search(Node* node, Key key) {
			
			if( node == NULL)
				return NULL;
			
			if( key == node->key)
				return &node->value;
				
			if( key < node->key )
				return _search( node->left, key);
			else
				return _search( node->right, key );
		}
		
		// 以node为根的二叉搜索树前序遍历 
		void _preOrder(Node* node) {
			
			if( node != NULL) {
				cout<< node->key << endl;
				_preOrder( node->left );
				_preOrder( node->right );
			}
				
		}
		
		// 以node为节点查找左子树 
		Node* _minimum(Node* node) {
			if( node->left == NULL )
				return node;
			return _minimum( node->left );
		}
		
		Node* _maxmum(Node* node) {
			if( node->right == NULL )
				return node;
			return _maxmum(node->right);
		}
		// 删除以node为根的二分搜索树中最小的节点
		// 返回删除节点后新的二分搜索树的根 
		Node* _removeMin(Node* node) {
			if( minNode->left == NULL ){
				
				Node* rightNode = node->right;
				delete node;
				count--;
				return rightNode;
			}
			
			// 在当前节点的左子树中删除最小节点
			// 并将删除节点后新的二分搜索树的根赋值给node->left 
			node->left = _removeMin( node->left );
			return node;
				 
		}
		
		// 删除掉以node为根的二分搜索树中键值为key的节点
		// 返回删除节点后新的二分搜索树的根
		Node* _remove( Node* node, Key key) {
			
			if( node == NULL )
				return NULL;
			
			if( key < node->key ){
				node-left = _remove( node->left, key);
				return node;
			}else if( key > node->key ){
				node->right = _remove( node->right, key );
				return node;
			} else {	// key == node->key
				
				if( node->left == NULL ) {
					Node* rightNode = node->right;
					delete node;
					count--;
					return rightNode;
				}
				if( node->right == NULL ) {
					Node* leftNode = node->left;
					delete node;
					count--;
					return leftNode;
				}
				
				// node->left != NULL &&n node->right != NULL
				Node *successor = new Node(minimum( node->right )); 
				count++;
				
				successor->right = removeMin( node->right );
				successor->left = node->left;
				
				delete node;
				count--;
				
				return successor;
				
			}
			
			
			
				
		} 
};

int main () {
	
	return 0;
}
