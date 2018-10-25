/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  let res = []
  let level = 0
  let arr = [root]

  while (arr.length) {
    let count = arr.length
    let isEvenLevel = level++%2
    let v = []

    while (count--) {
      let t = arr.shift()
      isEvenLevel ? v.unshift(t.val) : v.push(t.val)
      if (t.left) arr.push(t.left)
      if (t.right) arr.push(t.right)
    }
    res.push(v);
  }
  return res;
}