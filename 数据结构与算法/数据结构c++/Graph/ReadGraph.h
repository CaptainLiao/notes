#ifndef GRAPH_READGRAPH_H
#define GRAPH_READGRAPH_H

#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <cassert>

using namespace std;

//
// ��ȡһ���ļ�����������ת����һ��ͼ
// testG1: 13 13 ��ʾ���ͼ�� 13 �����㣬13 ����
// testG2: 6 8 ��ʾ 6 �����㣬8 ���� 
//

// ����һ��ģ���࣬���㸴��
template <typename Graph>
class ReadGraph{
	
public: 
	/** 
	* ���캯��
	* @graph �� Graph ����
	* @filename ��Ҫ��ȡ���ļ��� 
	*/
	ReadGraph( Graph &graph, const string &filename ) {
		
		ifstream file("testG1.txt"); // ��ȡ filename 
		string line;
		int V;	// ���� 
		int E;  // �� 
		
		assert( file.is_open() );
		
		assert( getline( file, line ) );	// ��ȡ file �е�һ�У�������� line �� 
		stringstream ss(line);	// �� line �е��ַ������뵽 stringstream �� ss ������
		ss>>V>>E;	// �� ss �е�ֵ��ֵ��V��E���������ͱ���
		
		// ��ʱ���ļ��еĵ�һ���Ѿ���ȡ����
		// ���ţ������ļ��е�ʣ������
		
		assert( V == graph.V() );	// ȷ���ļ��ж�ȡ�Ķ�������ͼ�еĶ�����һ��
		
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



