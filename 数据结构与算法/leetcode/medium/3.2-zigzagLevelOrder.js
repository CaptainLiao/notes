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


/**
  1、将每一层的节点都遍历完后，再进行下一层节点遍历
  2、用数组保存当前层中所有节点的值
  3、根据层级的奇偶性，选择保存节点值的方向：奇数层：从左到右；偶数层：从右到左
 */
var zigzagLevelOrder = function(root) {
  let res = []
  let level = 0
  let arr = [root]

  if (!root) return res;

  while (arr.length) {
    let count = arr.length
    let isEvenLevel = ++level%2
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