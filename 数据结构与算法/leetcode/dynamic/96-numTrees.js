/**
 * @param {number} n
 * @return {number}
 */

// 二叉搜索树的性质: 如果左子树不为空，则左子树的所有节点都小于它的根节点；若右子树不为空，则右子树的所有节点大于它的根节点

// 动态规划
// 第一步：假设结论已知
//          假设由前 n-1 个节点组成的二叉搜索树有 f(n-1) 种
// 第二步：求通项
//          求 n 个节点组成的二叉搜索树有多少种？根据二叉搜索树的性质，n 个节点组成的二叉搜索树有如下规律：
//            当根节点为 1，它的左子树的节点总数为 0， 右子树节点数为 n -1，总共有 f(0) x f(n-1)种二叉搜索树
//            当根节点为 2，它的左子树的节点总数为 1，右子树节点数为 n - 2, 总共有 f(1) x f(n-2)种二叉搜索树
//            ...
//            当根节点为 n，它的左子树节点数为 n-1，右子树节点数为 0，总共有 f(n-1) x f(0)种
//            所以，f(n) = f(0)xf(n-1) + f(1)xf(n-2) + ... + f(n-1)xf(0)

// 算法过程和上面相反，需要从前往后推。
var numTrees2 = function(n) {
  if (n === 0) return 1
  
  var res = 0
  var i = 0
  while (i < n) {
      res += numTrees(i) * numTrees(n-i-1)
      ++i
  }
  
  return res
};

// 递归算很简单、直白，但由于存在大量重复计算，上述算法存在严重的性能问题，需要缓存计算结果来减少重复计算。
// 根据上面取得的通项，且有 f(0) = 1，所以
// n = 0, f(0) = 1
// n = 1 f(1) = f(0)xf(0) = f(0)^2 = 1
// n = 2 f(2) = f(0)xf(1) + f(1)xf(0) = 2f(0)^3 = 2
// n = 3,f(3) = f(0)xf(2) + f(1)xf(1) + f(2)xf(0) = 5
// n = 4,f(4) = f(0)xf(3) + f(1)xf(2) + f(2)xf(1)+ f(3)xf(0) = 14
// ... 
// 即，每次计算当前值 current 时，都会遍历并累加之前的值。所有有了下面的优化
var numTrees = function(n) {
  var res = [0, 1]

  for (var i = 2; i <= n; ++i) {
      var current = 0
      for (var j = 0; j < i; ++j) {
        current += res[j] * res[i - j -1]
      }
      res[i] = current
  }
  
  return res[n]
}



