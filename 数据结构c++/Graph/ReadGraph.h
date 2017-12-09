#ifndef GRAPH_READGRAPH_H
#define GRAPH_READGRAPH_H

#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <cassert>

using namespace std;

//
// 读取一个文件，并将数据转化成一个图
// testG1: 13 13 表示这个图有 13 个顶点，13 条边
// testG2: 6 8 表示 6 个顶点，8 条边 
//

// 声明一个模板类，方便复用
template <typename Graph>
class ReadGraph{
	
public: 
	/** 
	* 构造函数
	* @graph 是 Graph 类型
	* @filename 是要读取的文件名 
	*/
	ReadGraph( Graph &graph, const string &filename ) {
		
		ifstream file("testG1.txt"); // 读取 filename 
		string line;
		int V;	// 顶点 
		int E;  // 边 
		
		assert( file.is_open() );
		
		assert( getline( file, line ) );	// 读取 file 中第一行，存入变量 line 中 
		stringstream ss(line);	// 将 line 中的字符串读入到 stringstream 的 ss 变量中
		ss>>V>>E;	// 将 ss 中的值赋值给V和E这两个整型变量
		
		// 此时，文件中的第一行已经读取完了
		// 接着，遍历文件中的剩余行数
		
		assert( V == graph.V() );	// 确认文件中读取的顶点数和图中的顶点数一致
		
		for( int i = 0; i < E; i++ ) {
		
			assert( getline( file, line ) );
			stringstream ss(line);
			
			int a, b;
			ss>>a>>b;
			assert( a >= 0 && a < V );
			assert( b >= 0 && b < V );
			
			graph.addEdge( a, b ); 
		} 
	} 

}; 















#endif 



