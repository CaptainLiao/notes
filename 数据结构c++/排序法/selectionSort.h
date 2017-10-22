#include<iostream>
#include<algorithm>
#include<ctime>
#include<cassert>

using namespace std;

template<typename T> 
void selectionSort(T arr[], int n ) {
	for(int i = 0; i < n; i ++) {
		
		// 寻找[i, n)区间里的最小值
		int minIndex = i;
		for( int j = i + 1; j < n; j ++)
			if( arr[j] < arr[minIndex] )
				minIndex = j;
		
		// 交换		
		swap( arr[i], arr[minIndex] );		 
	}
	
	return;
}
