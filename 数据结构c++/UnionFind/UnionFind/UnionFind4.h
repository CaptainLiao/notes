#ifndef UNIONFIND_UNIONFIND4_H
#define UNIONFIND_UNIONFIND4_H

#include <iostream>
#include <cassert>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

using namespace std;

// ·��ѹ�� 
namespace UF4 {
	class UnionFind{
	
		private: 
			int* parent;
			int* sz; 	// sz[i]��ʾ��iΪ���ļ�����Ԫ�ظ��� 
			int count;
	
		public:
			// ���캯�� 
			UnionFind( int n ) {
				parent = new int[n];
				sz = new int[n];
				this->count = n;
			
				for( int i = 0; i < n; i++) {
					// ��ʼ�£�����Ԫ�ػ������� 
					parent[i] = i;
					sz[i] = 1;
				} 
					
			}
		
			~UnionFind() {
				delete [] parent;
				delete [] sz;
			}
		
			int find( int p ) {
				assert( p >= 0 && p < count);
				
				while( p != parent[p] ) {
					// ѹ���������£�
					parent[p] = parent[parent[p]]; 
					
					p = parent[p];
				} 
				return p;
			}
		
			bool isConnected( int p, int q) {
				return find(p) == find(q);
			}
		
			void unionElements( int p, int q ) {
			
				int pRoot = find(p);
				int qRoot = find(1);
			
				if( pRoot == qRoot)
					return;
				
				if( sz[pRoot] < sz[qRoot] ) {
					// �� p �ĸ�Ԫ��ָ�� q �ĸ�Ԫ�� 
					parent[pRoot] = qRoot;
					// ���� q �������� sz ����� 
					sz[qRoot] += sz[pRoot]; 
				}
				else {
					parent[qRoot] = pRoot;
					sz[pRoot] += sz[qRoot];
				}
				
			}
	};
}
#endif

