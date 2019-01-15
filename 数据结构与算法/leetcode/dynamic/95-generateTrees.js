/**
 * 95. 不同的二叉搜索树 II
 * 给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。

示例:

输入: 3
输出:
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
解释:
以上的输出对应以下 5 种不同结构的二叉搜索树：

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
 */

var generateTrees = function(n) {
  if (n === 0) return []
  return helper(1, n)
};

function helper(start, end) {
  if (start > end) return [null]

  var res = []
  for (var i = start; i <= end; ++i) {
    // 后序遍历
    var leftTree = helper(start, i - 1)
    var rightTree = helper(i+1, end)
    for (var l of leftTree) {
      for (var r of rightTree) {
        var node = new TreeNode(i)
        node.left = l
        node.right = r
        res.push(node)
      }
    }
  }
  return res
}