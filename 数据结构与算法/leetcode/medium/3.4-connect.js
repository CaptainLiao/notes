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


/**
 * 【分析】
 * 无论采用什么方法，我们都需要一层一层的对二叉树进行遍历。
 * 利用每个节点都指向它右侧节点的这个性质，通过当前层的最左侧节点，就可以遍历完这一层的所有节点。
 * 用变量cur保存当前层的最左侧节点：
 * 	1、将cur的左子节点指向cur的右子节点；
 * 	2、将cur的右子节点指向cur的**右侧**节点的左子节点；
 * 	3、继续访问cur的右侧节点（即cur.next）；
 *  4、重复1、2、3，直到cur不存在。
 * 遍历下一层节点。
 * 
 * @param {TreeNode} root 
 * @returns void
 */
function conect(root) {
	if(!root) return;
	let cur = root;

	while (root) {
		while (cur) {
			if (cur.left) cur.left.next = cur.right;
			if (cur.right && cur.next) cur.right.next = cur.next.left;
			cur = cur.next;
		}
		root = root.left;
		cur = root;
	}
}
