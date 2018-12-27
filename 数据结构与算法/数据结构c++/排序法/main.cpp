#include <iostream>
#include "SortTestHelper.h"
#include "selectionSort.h"
#include "insertionSort.h"


using namespace std;


int main() {
	
	int n = 10000;
	int *arr = SortTestHelper::generateRandomArray(n,0,n);
	int *arr2 = SortTestHelper::copyIntArray(arr, n);

	SortTestHelper::testSort("Selection Sort", selectionSort, arr, n);
	SortTestHelper::testSort("insertSort2 Sort", insertSort, arr2, n);
	
	// ÊÍ·ÅÄÚ´æ 
	delete[] arr;
	delete[] arr2;
	return 0;
} 
