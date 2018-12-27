#ifndef GRAPH_DENSEGRAPH_H
#define GRAPH_DENSEGRAPH_H

#include <iostream>
#include <vector>
#include <cassert>

using namespace std;

// 稠密图 -- 邻接矩阵
class DenseGraph {

private:
	int n, m;
	bool directed;	// 方向
	vector<vector<bool> > g;	// 矩阵 
	
public:
	// n 表示顶点树， directed 表示是否是有向图 
	DenseGraph( int n, bool directed ) {
		this->n = n;	// 顶点 
		this->m = 0;	// 边 
		this->directed = directed;
		for( int i = 0; i < n; i++)
			// push 一个bool型的vector，它含有 n 个元素，每个元素为false 
			g.push_back( vector<bool>(n, false) ); 
	} 
	~DenseGraph() {
		
	} 
	
	int V() {
		return n;
	}
	int E() {
		return m;
	}
	// 在顶点 v 和 w 之间建立一条边 
	void addEdge( int v, int w ) {
		
		assert( v >= 0 && v < n);
		assert( w >= 0 && w < n);
		
		if( hasEdge( v, w ) )
			return;
		
		g[v][w] = true;
		if( !directed )
			g[w][v] = true;
		
		m++; 
	}
	
	// 顶点 v 和 w 之间是否有边 
	bool hasEdge( int v, int w ) {
		assert( v >= 0 && v < n);
		assert( w >= 0 && w < n);
		
		return g[v][w]; 
	}
	
	class adjIterator{
	private:
		DenseGraph &G;
		int v;
		int index;
	
	public:
		adjIterator(DenseGraph &graph, int v ): G(graph) {
			this->v = v;
			this->index = -1;
		}
		
		int begin() {
			index = 1;
			return next();
		}
		int next() {
			for( index += 1; index < G.V(); index++ )
				return index;
			return -1;
		}
		bool end() {
			return index >= G.V();
		}
	};
}; 

#endif















