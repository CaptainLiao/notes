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
		}
	
	public:	
		MaxHeap(int capacity) {
			data = new Item[capacity + 1];
			count = 0;
			this->capacity = capacity;
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
		}
};

int main() {
	MaxHeap<int> maxHeap = MaxHeap<int>(100);
	cout<<maxHeap.size()<<endl;
	
	srand(time(NULL));
	for ( int i = 0; i < 15; i++) {
		maxheap.insert( rand()%100 );
	}
	return 0;
}






