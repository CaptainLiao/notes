var pathSum = function(root, sum) {
  var outer = []
  var inner = []
  if (!root) return outer

  var helper = function(root, sum) {
    if (!root) return
    
    // 前序遍历，插入值
    sum -= root.val
    inner.push(root.val)
    if (sum == 0 && !root.left && !root.right) {
      outer.push([...inner])
    }

    helper(root.left)
    helper(root.right)

    // 后续遍历，要剪枝
    inner.pop()
  }

  helper()
  return outer
} 