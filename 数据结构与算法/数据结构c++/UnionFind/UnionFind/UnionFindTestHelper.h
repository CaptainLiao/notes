#ifndef UNIONFIND_UNIONFINDTESTHELPER_H
#define UNIONFIND_UNIONFINDTESTHELPER_H

#include <iostream>
#include <cassert>
#include <ctime>
#include "UnionFind1.h"
#include "UnionFind2.h"
#include "UnionFind3.h"
#include "UnionFind4.h"

using namespace std;

namespace UnionFindTestHelper {
	
	// n 表示数据量 
	void testUF1( int n ) {
		
		srand( time(NULL) );
		// 生成实例 
		UF1::UnionFind uf = UF1::UnionFind( n );
		
		// 计时开始 
		time_t startTime = clock();
		
		// 进行 并 操作 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// 判断是否连接 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// 计时结束 
		time_t endTime = clock();
		
		cout<< "UF1, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
	void testUF2( int n ) {
		
		srand( time(NULL) );
		// 生成实例 
		UF2::UnionFind uf = UF2::UnionFind( n );
		
		// 计时开始 
		time_t startTime = clock();
		
		// 进行 并 操作 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// 判断是否连接 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// 计时结束 
		time_t endTime = clock();
		
		cout<< "UF2, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
	void testUF3( int n ) {
		
		srand( time(NULL) );
		// 生成实例 
		UF3::UnionFind uf = UF3::UnionFind( n );
		
		// 计时开始 
		time_t startTime = clock();
		
		// 进行 并 操作 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// 判断是否连接 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// 计时结束 
		time_t endTime = clock();
		
		cout<< "UF3, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
	void testUF4( int n ) {
		
		srand( time(NULL) );
		// 生成实例 
		UF4::UnionFind uf = UF4::UnionFind( n );
		
		// 计时开始 
		time_t startTime = clock();
		
		// 进行 并 操作 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// 判断是否连接 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// 计时结束 
		time_t endTime = clock();
		
		cout<< "UF4, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
}

#endif
