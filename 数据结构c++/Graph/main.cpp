#include <iostream>
#include <cassert>
#include <ctime>

#include "SparseGraph.h"
#include "DenseGraph.h"
#include "ReadGraph.h"

using namespace std;

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main() {
	
	string filename = "testG1.txt";
	
	SparseGraph g1( 13, false );
	// ����ģ�����ȡ�ļ�������ͼ
	ReadGraph<SparseGraph> readGraph1( g1, filename );
	g1.show();
	
	return 0;
}












