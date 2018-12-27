#include<iostream>
#include<algorithm>
#include<ctime>
#include<cassert>

using namespace std;

namespace SortTestHelper {
	
	// 生成有n个元素的随机数组，每个元素的随机范围为[rangeL, rangeR]
	int* generateRandomArray(int n, int rangeL, int rangeR) {
		assert(rangeL <= rangeR);
		
		int *arr = new int[n];
		srand(time(NULL));
		for( int i = 0; i < n; i ++)
			arr[i] = rand() % (rangeR - rangeL + 1) + rangeL;
		return arr;
	} 
	
	template<typename T>
	void printArray (T arr[], int n) {
		for ( int i = 0; i < n; i ++)
			cout << arr[i] << " ";
		cout << endl;
		
		return;
	} 
	
	// 判断排序是否正确 
	template<typename T>
	bool isSorted (T arr[], int n) {
		for ( int i = 0; i < n; i ++)
			if (arr[i] > arr[i + 1])
				return false;
		
		return true;
	} 	
	
	// 性能测试
	template<typename T>
	void testSort( string sortName, void(*sort)(T[], int), T arr[], int n)  {
		
		clock_t startTime = clock();
		sort(arr, n);
		clock_t endTime = clock();

		cout << sortName << " : " << double(endTime - startTime) / CLOCKS_PER_SEC << "S" << endl;

		return;
	}
	
	int* copyIntArray(int a[], int n) {
		int* arr = new int[n];
		copy(a, a+n, arr);
		return arr;
	}
}








