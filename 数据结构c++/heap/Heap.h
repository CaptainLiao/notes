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
		
		// k ��ʾҪ����Ԫ�����������λ�� 
		void shiftDown( int k ) {
			
			while( k*2 <= count) { // ��ǰԪ�����ӽڵ� (���ӽڵ���ڱ�ʾ�ӽڵ����)
				
				int j = 2*k;  // �ڴ���ѭ���У�data[k]��data[j]����λ��
				
				if( j + 1 <= count && data[j] < data[j + 1])	// ��֤���ӽڵ���ڣ����ж����ӽڵ�ֵС�����ӽڵ� 
					j += 1;
				
				if(data[k] >= data[j])	//  ���ڵ�ֵ����Ҫ������ֵ������ѭ������ 
					break;
				
				swap( data[j], data[k] );	// ����ֵ 
				k = j;	 
			}
		}
	
	public:	
		MaxHeap(int capacity) {
			data = new Item[capacity + 1];
			count = 0;
			this->capacity = capacity;
		}
		
		// �������أ������������������(heapify) 
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
			
			Item ret = data[1];		// ȡ���������ֵ 
			
			swap( data[1], data[count] );	// ������һ��ֵ�����һ��ֵ 
			count--;	// ���鳤�ȼ�һ 
			
			shiftDown(1);
			
			return ret;
		}
};
