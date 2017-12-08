#include <iostream>
#include <cassert>
#include <ctime>

#include "SparseGraph.h"
#include "DenseGraph.h"

using namespace std;

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char** argv) {
	int N = 20;
	int M = 100;
	
	srand( time(NULL) );
	
	// Sparse Graph
	// N 个节点的无向图 
	SparseGraph g1( N, false );
	for( int i = 0; i < M; i++ ) {
		int a = rand()%N;
		int b = rand()%N;
		g1.addEdge( a, b ); 
	}
	
	// 打印邻边 
	for( int v = 0; v < N; v++) {
		cout<<v<<" : ";
		SparseGraph::adjIterator adj( g1, v );
		for( int w = adj.begin(); !adj.end(); w = adj.next() )
			cout<<w<<" ";
		cout<<endl;
	}
	
	cout<<endl;
	
	// Dense Graph
	// N 个节点的无向图 
	DenseGraph g2( N, false );
	for( int i = 0; i < M; i++ ) {
		int a = rand()%N;
		int b = rand()%N;
		g2.addEdge( a, b ); 
	}
	
	// 打印邻边 
	for( int v = 0; v < N; v++) {
		cout<<v<<" : ";
		DenseGraph::adjIterator adj( g2, v );
		for( int w = adj.begin(); !adj.end(); w = adj.next() )
			cout<<w<<" ";
		cout<<endl;
	}
	
	cout<<endl;

	return 0;
}













