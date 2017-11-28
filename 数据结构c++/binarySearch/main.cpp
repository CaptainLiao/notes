#include <iostream>

using namespace std;

// ���ֲ��ҷ�������������arr�У�����target 
// ����ҵ�target��������Ӧ������indexֵ
// ���򷵻� -1 
template<typename T>
int binarySearch(T arr[], int n, T targe ) {
	
	// �� arr[l...r]֮�в���target
	int l = 0, r = n -1;
	
	while( l <= r ) {
		// ȡ�����м����� 
		// int mid = (l + r) / 2; bug��l + r ���ʱ 
		int mid = l + (r - l)/2; 
		if( arr[mid] === target)
			return mid;
		
		if( target < arr[mid] )
			// ��arr[l...mid-1]�в���target 
			r = mid - 1;
		else  // target > arr[mid] 
			// ��arr[mid+1...r]�в���target 
			l = mid + 1;
	} 
	
	return -1; 
}

int main () {
	
	return 0;
}
