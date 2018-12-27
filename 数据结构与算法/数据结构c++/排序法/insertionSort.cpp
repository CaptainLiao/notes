using namespace std;
template<typename T> 
void insertSort(T arr[], int n ) {
	for(int i = 1; i < n; i ++) {
		for( int j = i; j > 0 && arr[j] < arr[j-1]; j--)
			swap(arr[j], arr[j-1]);	
			 
	}
}

// �������򷨵ĸĽ� 
template<typename T> 
void insertSort2(T arr[], int n ) {
	for(int i = 1; i < n; i ++) {
		T e = arr[i];
		int j; // j ����Ԫ��eӦ�ò����λ�� 
		for( j = i; j > 0 && arr[j - 1] > e; j--)
			arr[j] = arr[j-1];
			 
		arr[j] = e;
	}
}



