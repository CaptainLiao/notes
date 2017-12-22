#ifndef UNIONFIND_UNIONFIND1_H
#define UNIONFIND_UNIONFIND1_H

#include <iostream>
#include <cassert>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

using namespace std;

// quick find
namespace UF1 {
	class UnionFind{
	
		private: 
			int* id;
			int count;
	
		public:
			// ¹¹Ôìº¯Êý 
			UnionFind( int n ) {
				count = n;
				id = new int[n];
			
				for( int i = 0; i < n; i++)
					id[i] = i;
			}
		
			~UnionFind() {
				delete [] id;
			}
		
			int find( int p ) {
				assert( p >= 0 && p < count);
				return id[p];
			}
		
			bool isConnected( int p, int q) {
				return find(p) == find(q);
			}
		
			void unionElements( int p, int q ) {
			
				int pID = find(p);
				int qID  = find(1);
			
				if( pID == qID)
					return;
			
				for( int i = 0; i < count; i++) 
					if( id[i] == pID )
						id[i] = qID;
			}
	};
}
#endif

