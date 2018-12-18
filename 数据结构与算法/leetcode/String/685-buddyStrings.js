/**
 * 给定两个由小写字母构成的字符串 A 和 B ，
 * 只要我们可以通过交换 A 中的两个字母得到与 B 相等的结果，就返回 true ；
 * 否则返回 false 。
 * 
 */

function buddyStrings(A, B) {
  if (A.length !== B.length) return false

  if (A === B) {
    var t = Array(24).fill(0)
    for (var s of A) {
      ++t[s.charCodeAt() - 97]
      if (t.find(num => num >= 2)) return true
    }
    return false
  }

  var a = []
  var b = []
  for (var i = 0; i < A.length; ++i) {
    if (A[i] !== B[i]) {
      a.push(A[i])
      b.push(B[i])
    }
  }
  
  if (a.length === 2 && b.length === 2) {
    return a[0] === b[1] && a[1] === b[0]
  } else {
    return false
  }

}