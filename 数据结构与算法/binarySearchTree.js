
// 私有类
class __Node {
	constructor(key, value, left = null, right = null) {
		this.key = key
		this.value = value
		this.left = left
		this.right = right
	}
}

// 二分搜索树性质:
// *	它是一颗二叉树
// *	每个节点的键值 大于 左子树
// *	每个节点的键值 小于 右子树
// *	以左右子树为根的子树仍为二分搜索树
class BST {
	constructor() {
		this.count = 0
		this.root = null
	}

	insert(key, value) {
		// 向以 node 为根的二叉搜索树中,插入节点(key,value)
		// 返回插入新节点后的二叉搜索树的根
		let __insert = (node, key, value) => {
			if(node === null) {
				this.count++
				return new __Node(key, value)
			}

			if(key === node.key) {
				node.value = value
			} else if( key < node.key ) {
				// insert to left-child-tree
				node.left = __insert(node.left, key, value)
			} else {
				// insert to right-child-tree
				node.right = __insert(node.right, key, value)
			}
			return node
		}
		this.root = __insert(this.root, key, value)
	}

	// 在以 root 为根节点的二分搜索树中查找一个key,有两种返回值:
	// *	返回 node 节点. 一个封装良好的类中,不应对外暴露私有对象.显然,我们在设计 BST 类时,不希望外界接触到 node 类
	// *	返回 value(常用),注意在 c++ 等强类型语言中,要处理 value 为空的情形
	find(key) {
		return this.__find(this.root, key).value
	}
	__find(node, key) {
		if(key === node.key) {
			return node
		} else if( key < node.key ) {
			return this.__find(node.left, key)
		} else {
			return this.find(node.right, key)
		}
	}

	preOrder() {
		let __preOrder = node => {
			if(node === null) return

			console.log(node.key)
			__preOrder(node.left)
			__preOrder(node.right)
		}

		__preOrder(this.root)
	}
	
	midOrder() {
		let __midOrder = node => {
			if(node === null) return

			__midOrder(node.left)
			console.log(node.key)
			__midOrder(node.right)
		}
		__midOrder(this.root)
	}

	postOrder() {
		let __postOrder = node => {
			if( node === null ) return

			__postOrder(node.left)
			__postOrder(node.right)
			console.log(node.key)
		}

		__postOrder(this.root)
	}
	// 层序遍历
	levelOrder(fn = v => console.log(v)) {
		let queue = []
		queue.push(this.root)

		while(queue.length > 0) {
			let head_node = queue.shift()
			fn(head_node.key)

			if(head_node.left) queue.push(head_node.left)
			if(head_node.right) queue.push(head_node.right)
		}
	}

	maxKey() {
		if( this.root == null ) throw new Error('root is null!')
		return this.__maxKey(this.root).key
	}
	__maxKey(node) {
		if(node.right === null) return node
		return this.__maxKey(node.right)
	}

	minKey() {
		if( this.root == null ) throw new Error('root is null!')
		return this.__minKey(this.root).key
	}
	__minKey(node) {
		if(node.left === null) return node
		return this.__minKey(node.left)
	}

	__destory(node) {
		if(node === null) return
		this.__destory(node.left)
		this.__destory(node.right)

		node = null
		this.count--
	}

	// 删除最大key
	removeMaxKey() {
		this.root = this.__removeMaxKey(this.root)
	}
	__removeMaxKey(node) {
		if(node.right === null) {
			let nodeLeft = node.left
			node = null
			this.count--
			return nodeLeft
		}
		node.right = this.__removeMaxKey(node.right)
		return node
	}

	// 删除最小key
	removeMinKey() {
		this.root = this.__removeMinKey(this.root)
	}
	__removeMinKey(node) {
		if( node.left == null ) {
			let rightNode = node.right
			node = null
			this.count--
			return rightNode

		}
		node.left = this.removeMinKey(node.left)
		return node
	}

	remove(key) {
		// 删除以 node 为根的二分搜索树中键值为 key 的节点
		// 返回删除节点后新的二分搜索树的根
		let __remove = (node, key) => {
			if( node === null ) return

			if(key < node.key) {
				node.left = this.__remove(node.left)
				return node
			} else if( key > node.key ) {
				node.right = this.__remove(node.right)
				return node
			} else {
				// key === node.key
				if( node.left === null ) {
					let rightNode = node.right
					node = null
					this.count--
					return rightNode
				}
				if( node.right === null ) {
					let leftNode = node.left
					node = null
					this.count--
					return leftNode
				}

				let {
					key,
					value,
					left,
					right
				} = this.__minKey(node.right)
				let successor = new __Node(key, value, left, right)
				this.count++

				successor.left = node.left
				successor.right =  this.__removeMinKey(node.right)

				node = null
				this.count--

				return successor

			}
		}


		this.root = __remove(this.root, key)
	}
}

let bst = new BST()
for(var i = 0; i < 4; i++) {
	bst.insert(~~(Math.random() * 100), ~~(Math.random() * 100) )
}
bst.insert(33, 10 )
bst.midOrder()
console.log('----------')
bst.removeMaxKey()
bst.midOrder()





















// function binarySearch(arr, target) {
// 	return __bs(arr, 0, arr.length - 1, target)

// 	function __bs(arr, l, r, target) {
// 		let mid = l + ~~((r-l)/2)
		
// 		if( l > r ) return -1
// 		if(target === arr[mid])	return mid
		
// 		if( target < arr[mid] )
// 			return __bs(arr, l, mid - 1, target)
// 		else 
// 			return __bs(arr, mid+1, r, target)
// 	}
// }

// function binarySearch2(arr, target) {
// 	let l = 0
// 	let r = arr.length - 1
// 	while( l <= r ) {
// 		let mid = l + ~~((r-l)/2)
// 		if( target == arr[mid] )
// 			return mid
// 		if( target < arr[mid] )
// 			r = mid - 1
// 		else
// 			l = mid + 1
// 	}
// 	return -1
// }

// console.log(binarySearch([1,2,3,5,66,99], 3))

// console.log(binarySearch([1,2,3,5,66,99], 1))
// console.log(binarySearch([1,2,3,5,66,99], 99))







