
// 使用数组存储二叉堆
//
// 二叉堆定义:
// * 完全二叉树
// * 子树小于父树
// * 左子树小于右子树

class MaxHeap {
	
	constructor( capacity ) {
	    this.data = []
	    this.count = 0
	}

	size() {
		return this.count
	}

	isEmpty() {
	  return this.count === 0
	}

	insert(item) {
		// data 数组下标从 1 开始
		this.data[++this.count] = item

		// shiftUp 用来维护堆的定义
		__shiftUp.call(this, this.count )

	   function __shiftUp(index) {
			while( index > 1 && this.data[index] > this.data[~~(index/2)]) {
				let t = this.data[index]
				this.data[index] = this.data[~~(index/2)]
				this.data[~~(index/2)] = t
				index = ~~(index/2)
		    }
	    }
	}

	extractMax() {
		let res = this.data[1]
		this.data[1] = this.data[this.count]
		this.data[this.count] = res
		this.count--
		this.data.length--

		__shiftDown.call(this, 1)
		return res

		function __shiftDown(index) {
			while( index * 2 < this.count ) {
				let j = index * 2
				if( j + 1 < this.count &&  this.data[j + 1] > this.data[j] )
					j += 1
				if( this.data[index] >= this.data[j] )
					break

				let t = this.data[index]
				this.data[index] = this.data[j]
				this.data[j] = t
				index = j
			}
		}
	}
}

let maxheap = new MaxHeap(100)

for(var i = 0; i < 10; i++) {
	maxheap.insert(~~(Math.random() * 100) )
}
console.log(maxheap.data)
console.log(maxheap.extractMax())

console.log(maxheap.data)















