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
	vector<vector<int> > g;
	
public:
	SparseGraph( int n, bool derected ) {
		this->n = n;
		this->m = 0;
		this->derected = derected;
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
		if( v != w && !derected ) 
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
	
	void show() {
		
		for( int i = 0; i < n; i++ ) {
			cout<<"vertex "<<i<<":\t";
			for( int j = 0; j < g[i].size(); j++ )
				cout<<g[i][j]<<"\t";
			cout<<endl;
		}
	}
	
	// 搞一个迭代器
	class adjIterator {
	private:
		SparseGraph &G;
		int v;
		int index;
	
	public:
		adjIterator( SparseGraph &graph, int v ): G(graph) {
			this->v = v;
			this->index = 0; 
		}
		
		int begin() {
			index = 0;
			
			if( index < G.g[v].size() )
				return G.g[v][index];
			return -1;
		}
		
		int next() {
			index++;
			if( index < G.g[v].size() )
				return G.g[v][index];
			return -1;
		}
		
		bool end() {
			return index >= G.g[v].size();
		}
	
	}; 
}; 

#endif


















