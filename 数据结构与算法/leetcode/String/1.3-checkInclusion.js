/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 *
 *  滑动窗口
 *  https://www.cnblogs.com/MrSaver/p/9638279.html
 * 
 * 我们改造一下题目：s1 和 s2 的长度相等，判断 s2 是否包含 s1 的排列？
 *  1、用数组分别记录 s1 和 s2 中每个字符出现的次数
 *  2、比较两个数组是否相等，相等则为 True，否则返回 False
 * 
 * 如果 s1 和 s2 的长度不相等呢？
 * 用同样的方法，不过在每次记录 s2 中字符出现的次数之前，需要修剪那些已经存储在数组中的字符出现的次数
 */

function checkInclusion(s1, s2) {
  // 用数组存储每个字符出现的次数
  var arr1 = Array[24].fill(0)
  var arr2 = Array[24].fill(0)
  var INDEX = 'a'.charCodeAt(0)

  // 存储 s1 中每个字符出现的次数
  for(var c of s1) {
    ++arr1[c.charCodeAt() - INDEX]
  }

  var l1 = s1.length
  var l2 = s2.length
  
  for (var i = 0; i < l2; ++i) {
    // 修剪
    if (i >= l1) --arr2[s2[i-l1].charCodeAt() - INDEX]
    
    // 存储 s2 中每个字符出现的次数
    ++arr2[s2[i].charCodeAt() - INDEX]

    // 每次都比较两个数组
    if (isEqualArrary(arr1, arr2)) return true
  }
}

function isEqualArrary(a1, a2) {
  if (a1.length !== a2.length) return false
  
  return a1.every((item, index) => item === a2[index])
}
