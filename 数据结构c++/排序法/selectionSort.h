#include<iostream>
#include<algorithm>
#include<ctime>
#include<cassert>

using namespace std;

template<typename T> 
void selectionSort(T arr[], int n ) {
	for(int i = 0; i < n; i ++) {
		
		// Ѱ��[i, n)���������Сֵ
		int minIndex = i;
		for( int j = i + 1; j < n; j ++)
			if( arr[j] < arr[minIndex] )
				minIndex = j;
		
		// ����		
		swap( arr[i], arr[minIndex] );		 
	}
	
	return;
}
