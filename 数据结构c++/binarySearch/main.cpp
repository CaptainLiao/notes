#include <iostream>

using namespace std;

// 二分查找法，在有序数组arr中，查找target 
// 如果找到target，返回相应的索引index值
// 否则返回 -1 
template<typename T>
int binarySearch(T arr[], int n, T targe ) {
	
	// 在 arr[l...r]之中查找target
	int l = 0, r = n -1;
	
	while( l <= r ) {
		// 取数组中间索引 
		// int mid = (l + r) / 2; bug：l + r 溢出时 
		int mid = l + (r - l)/2; 
		if( arr[mid] === target)
			return mid;
		
		if( target < arr[mid] )
			// 在arr[l...mid-1]中查找target 
			r = mid - 1;
		else  // target > arr[mid] 
			// 在arr[mid+1...r]中查找target 
			l = mid + 1;
	} 
	
	return -1; 
}

int main () {
	
	return 0;
}
