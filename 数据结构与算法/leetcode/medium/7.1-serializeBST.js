/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    var resArr = []
    var queue = [root]
    
    // levelOrder
    while (queue.filter(Boolean).length) {
        var t = queue
        queue = []
        
        while (t.length) {
            var node = t.shift()
            if (node) {
                resArr.push(node.val)
                queue.push(node.left)
                queue.push(node.right)
            } else {
                resArr.push(null)
                queue.push(null)
                queue.push(null)
            }
        }
    }
    
    for (var i = resArr.length - 1; i >= 0; --i) {
        if (resArr[i]) return resArr
        resArr.length = i
    }
      
    return resArr
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 *
 *  假设根节点序号为 0，那么对序号为 i 的任意节点，它的左孩子序号是 2*i+1，它的右孩子序号是 2*i+2。
 */
var deserialize = function(data) {
    if (data.length === 0) return []
    
    var root = new TreeNode(data[0])
    root.left = __deserialize(data, 1)
    root.right = __deserialize(data, 2)
    return root
};

function __deserialize(data, index) {
    if (index >= data.length) return null
    
    var node = new TreeNode(data[index])
    node.left = __deserialize(data, index*2+1)
    node.right = __deserialize(data, index*2+2)
    return node
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */