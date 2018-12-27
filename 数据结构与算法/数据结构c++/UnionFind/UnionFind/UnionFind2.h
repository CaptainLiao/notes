#ifndef UNIONFIND_UNIONFIND2_H
#define UNIONFIND_UNIONFIND2_H

#include <iostream>
#include <cassert>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

using namespace std;

// quick union
namespace UF2 {
	class UnionFind{
	
		private: 
			int* parent;
			int count;
	
		public:
			// ���캯�� 
			UnionFind( int n ) {
				parent = new int[n];
				this->count = n;
			
				for( int i = 0; i < n; i++)
					// ��ʼ�£�����Ԫ�ػ������� 
					parent[i] = i;
			}
		
			~UnionFind() {
				delete [] parent;
			}
		
			int find( int p ) {
				assert( p >= 0 && p < count);
				
				while( p != parent[p] ) {
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
			
				parent[pRoot] = qRoot;
			}
	};
}
#endif

