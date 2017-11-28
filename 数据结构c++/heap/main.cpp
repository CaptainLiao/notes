#include <iostream>
#include <algorithm>
#include <string>
#include <ctime>
#include <cmath>
#include <cassert>

#include "Heap.h"

using namespace std;

template<typename T>

// ������1 
void heapSort1( T arr[], int n) {
	
	MaxHeap<T> maxHeap = MaxHeap<T>(n);
	for ( int i = 0; i < n; i ++ )	// ������ȫ���������� 
		maxHeap.insert(arr[i]);
	
	for ( int i = n - 1; i >= 0; i--)	// ��С�������� 
		arr[i] = maxHeap.extractMax();
}

// ������2
void heapSort2( T arr[], int n) {
	
	// heapify
	MaxHeap<T> maxHeap = MaxHeap<T>(arr, n);
	
	for ( int i = n - 1; i >= 0; i--)	// ��С�������� 
		arr[i] = maxHeap.extractMax();
}

int main() {
	MaxHeap<int> maxHeap = MaxHeap<int>(100);
	cout<<maxHeap.size()<<endl;
	
	srand(time(NULL));
	for ( int i = 0; i < 15; i++) {
		maxheap.insert( rand()%100 );
	}
	return 0;
}






