#ifndef GRAPH_SPARSEGRAPH_H
#define GRAPH_SPARSEGRAPH_H

#include <iostream>
#include <vector>
#include <cassert>

using namespace std;

// 稀疏图-- 邻接表 
class SparseGraph {

private:
	int n, m;
	bool derected;
	vector<vector<int>> g;
	
public:
	SparseGraph( int n, bool directed ) {
		this->n = n;
		this->m = 0;
		this->derected = directed;
		for( int i = 0; i < n; i++ ) 
			g.push_back( vector<int>() ); 
	}	
	~SparseGraph() {
		
	}
	
	int V() {
		return n;
	}
	int E() {
		return m;
	}
	
	void addEdge( int v, int w ) {
		assert( v >= 0 && v < n);
		assert( w >= 0 && w < n);
		
		g[v].push_back( w );
		// 处理自环边和有向边 
		if( v != w && !directed ) 
			g[w].push_back( v );
		
		m++;
	}
	
	bool hasEdge( int v, int w ) {
		assert( v >= 0 && v < n);
		assert( w >= 0 && w < n);
		
		for( int i = 0; i < g[v].size(); i++ )
			if( g[v][i] == w )
				return true;
		return false;
	} 
	
}; 

#endif

