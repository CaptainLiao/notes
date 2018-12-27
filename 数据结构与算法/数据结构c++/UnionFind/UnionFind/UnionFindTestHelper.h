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
	
	// n ��ʾ������ 
	void testUF1( int n ) {
		
		srand( time(NULL) );
		// ����ʵ�� 
		UF1::UnionFind uf = UF1::UnionFind( n );
		
		// ��ʱ��ʼ 
		time_t startTime = clock();
		
		// ���� �� ���� 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// �ж��Ƿ����� 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// ��ʱ���� 
		time_t endTime = clock();
		
		cout<< "UF1, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
	void testUF2( int n ) {
		
		srand( time(NULL) );
		// ����ʵ�� 
		UF2::UnionFind uf = UF2::UnionFind( n );
		
		// ��ʱ��ʼ 
		time_t startTime = clock();
		
		// ���� �� ���� 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// �ж��Ƿ����� 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// ��ʱ���� 
		time_t endTime = clock();
		
		cout<< "UF2, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
	void testUF3( int n ) {
		
		srand( time(NULL) );
		// ����ʵ�� 
		UF3::UnionFind uf = UF3::UnionFind( n );
		
		// ��ʱ��ʼ 
		time_t startTime = clock();
		
		// ���� �� ���� 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// �ж��Ƿ����� 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// ��ʱ���� 
		time_t endTime = clock();
		
		cout<< "UF3, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
	void testUF4( int n ) {
		
		srand( time(NULL) );
		// ����ʵ�� 
		UF4::UnionFind uf = UF4::UnionFind( n );
		
		// ��ʱ��ʼ 
		time_t startTime = clock();
		
		// ���� �� ���� 
		for( int i = 0; i < n; i++){
			int a = rand()%n;
			int b = rand()%n;
			uf.unionElements(a, b);
		}
		
		// �ж��Ƿ����� 
		for( int i = 0; i < n; i++) {
			int a = rand()%n;
			int b = rand()%n;
			uf.isConnected(a, b);
		}
		// ��ʱ���� 
		time_t endTime = clock();
		
		cout<< "UF4, "<<2*n<< " ops, "<< double(endTime-startTime)/CLOCKS_PER_SEC<<endl; 
	}
	
}

#endif
