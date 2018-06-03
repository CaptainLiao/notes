

class BST {


}

class Node {
	
	constructor(key, value) {
		this.key = key
		this.value = value
		this.left = this.right = null
	}
}
























function binarySearch(arr, target) {
	return __bs(arr, 0, arr.length - 1, target)
	function __bs(arr, l, r, target) {
		let mid = l + ~~((r-l)/2)
		if( l > r ) return -1
		if(target === arr[mid])	return mid
		
		if( target < arr[mid] )
			return __bs(arr, l, mid - 1, target)
		else 
			return __bs(arr, mid+1, r, target)
	}
}

function binarySearch2(arr, target) {
	let l = 0
	let r = arr.length - 1
	while( l <= r ) {
		let mid = l + ~~((r-l)/2)
		if( target == arr[mid] )
			return mid
		if( target < arr[mid] )
			r = mid - 1
		else
			l = mid + 1
	}
	return -1
}

console.log(binarySearch([1,2,3,5,66,99], 3))

console.log(binarySearch([1,2,3,5,66,99], 1))
console.log(binarySearch([1,2,3,5,66,99], 99))







