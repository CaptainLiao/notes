let connext = function (root) {
	if (!root) return

	let queue = [root]
	while (queue.length) {
		let count = queue.length
		let pre = null

		while (count--) {
			let node = queue.shift()
			node.next = pre
			pre = node

			if (node.right) queue.push(node.right)
			if (node.left) queue.push(node.left)
		}
	}
}
