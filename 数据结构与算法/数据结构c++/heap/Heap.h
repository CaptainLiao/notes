#include <iostream>
#include <algorithm>
#include <string>
#include <ctime>
#include <cmath>
#include <cassert>

using namespace std;

template<typename Item>
class MaxHeap{
	
	private:
		Item* data;
		int count;
		int capacity;
		void shiftUp( int k ) {
			
			while( k > 1 && data[k/2] < data[k] ) {
				swap(data[k/2], data[k]);
				k /= 2;
			}
		};
		
		// k 表示要插入元素所在数组的位置 
		void shiftDown( int k ) {
			
			while( k*2 <= count) { // 当前元素有子节点 (左子节点存在表示子节点存在)
				
				int j = 2*k;  // 在此轮循环中，data[k]和data[j]交换位置
				
				if( j + 1 <= count && data[j] < data[j + 1])	// 保证右子节点存在，在判断左子节点值小于右子节点 
					j += 1;
				
				if(data[k] >= data[j])	//  父节点值大于要交换的值，此轮循环结束 
					break;
				
				swap( data[j], data[k] );	// 交换值 
				k = j;	 
			}
		}
	
	public:	
		MaxHeap(int capacity) {
			data = new Item[capacity + 1];
			count = 0;
			this->capacity = capacity;
		}
		
		// 函数重载，对数组进行最大堆排序(heapify) 
		MaxHeap( Item arr[], int n ) {
			
			data = new Item[n +1];
			capacity = n;
			for( int i = 0; i < n; i++)
				data[i + 1] = arr[i];
			count = n;
			
			for( int i = count/2; i >= 1; i--)
				shiftDown(i);
		} 
	
		~MaxHeap() {
			delete [] data;
		}	
	
		int size() {
			return count;
		}
	
		bool isEmpty() {
			return count == 0;
		}
		
		void insert(Item item) {
			
			assert( count + 1 <= capacity);
			
			data[++count] = item;
			shiftUp( count );
		}
		
		Item extractMax() {
			assert( count > 0 );
			
			Item ret = data[1];		// 取出堆中最大值 
			
			swap( data[1], data[count] );	// 交换第一个值和最后一个值 
			count--;	// 数组长度减一 
			
			shiftDown(1);
			
			return ret;
		}
};
