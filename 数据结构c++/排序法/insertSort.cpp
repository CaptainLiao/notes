#include <iostream>
#include "SortTestHelper.h"

using namespace std;

template<typename T> 
void insertSort(T arr[], int n ) {
	for(int i = 1; i < n; i ++) {
		
		for( int j = i; j > 0 && arr[j] < arr[j-1]; j --) 
			swap( arr[j], arr[j - 1] );
	}
}

int main() {
	
	int n = 10000;
	int *arr = SortTestHelper::generateRandomArray(n,0,n);
	int *arr2 = SortTestHelper::copyIntArray(arr, n);

	SortTestHelper::testSort("Selection Sort", selectionSort, a, n);
	SortTestHelper::testSort("Insert Sort", insertSort, a, n);
	
	// ÊÍ·ÅÄÚ´æ 
	delete[] arr;
	delete[] arr2;
	return 0;
} 
