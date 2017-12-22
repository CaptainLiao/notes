#ifndef UNIONFIND_UNIONFIND4_H
#define UNIONFIND_UNIONFIND4_H

#include <iostream>
#include <cassert>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

using namespace std;

// 路径压缩 
namespace UF4 {
	class UnionFind{
	
		private: 
			int* parent;
			int* sz; 	// sz[i]表示以i为根的集合中元素个数 
			int count;
	
		public:
			// 构造函数 
			UnionFind( int n ) {
				parent = new int[n];
				sz = new int[n];
				this->count = n;
			
				for( int i = 0; i < n; i++) {
					// 初始下，两两元素互不连接 
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
					// 压缩过程如下：
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
					// 让 p 的根元素指向 q 的根元素 
					parent[pRoot] = qRoot;
					// 所以 q 所在树的 sz 变大了 
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

