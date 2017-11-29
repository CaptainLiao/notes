#include <iostream>
#include <queue>

using namespace std;

template<typename Key, typename Value>
class BST {
	
	private:
		// ���� Node �ṹ�� 
		struct Node {
			Key key;
			Value value;
			Node *left;
			Node *right;
			
			// Node�ڵ㹹�캯�� 
			Node(Key key, Value value) {
				this->key = key;
				this->value = value;
				this->left = this->right = NULL; 
			}
		}; 
		
		Node *root; // ���ڵ㣬ָ��Node��ָ��
		int count;
		
	public:
		// ���캯�� 
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
		
		// ����һ��ָ��key������ΪValue��ָ��
		Value* search(Key key) {
			return _search( root, key );
		} 
		
		// ǰ�����
		void preOrder() {
			_preOrder(root);
		} 
		
		// �������
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
	
	private:
		// ���� node Ϊ���Ķ����������У�����ڵ㣨key, value)
		// ���ز���ڵ��Ķ����������ĸ�
		Node* _insert(Node *node, Key key, Value value) {
			
			if (node === NULL) {
				count++;
				return new Node(key, value); 
			}
			
			if( key === node->key )
				// ����ԭ����ֵ 
				node->value = value;
			else if( key < node->key )
				// �ݹ飬�� node ���Ӳ���ڵ㣬���ز���ڵ�ĸ���ֵ��node->left 
				node->left = _insert(node->left, key, value); 
			else
				// �ݹ飬�� node �Һ��Ӳ���ڵ� �����ز���ڵ�ĸ���ֵ��node->right
				node->right = _insert(node->right, key, value);
			return node; 
		} 
		
		// �鿴��node Ϊ���Ķ��������������Ƿ������ֵΪkey�Ľڵ� 
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
		
		// ����nodeΪ���Ķ����������в���key��Ӧ��value 
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
		
		// ��nodeΪ���Ķ���������ǰ����� 
		void _preOrder(Node* node) {
			
			if( node != NULL) {
				cout<< node->key << endl;
				_preOrder( node->left );
				_preOrder( node->right );
			}
				
		}
};

int main () {
	
	return 0;
}
