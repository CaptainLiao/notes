using namespace std;
template<typename T> 
void insertSort(T arr[], int n ) {
	for(int i = 1; i < n; i ++) {
		for( int j = i; j > 0 && arr[j] < arr[j-1]; j--)
			swap(arr[j], arr[j-1]);	
			 
	}
}

// 插入排序法的改进 
template<typename T> 
void insertSort2(T arr[], int n ) {
	for(int i = 1; i < n; i ++) {
		T e = arr[i];
		int j; // j 保存元素e应该插入的位置 
		for( j = i; j > 0 && arr[j - 1] > e; j--)
			arr[j] = arr[j-1];
			 
		arr[j] = e;
	}
}



