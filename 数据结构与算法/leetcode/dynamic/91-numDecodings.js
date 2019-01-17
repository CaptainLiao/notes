/**
 * 91. 解码方法
 * https://leetcode-cn.com/problems/decode-ways/
 */

// 分析：使用动态规划三部曲
// 第一步：假设前 n-1 项结果已知
// 第二步：求第 n 项结果，分析得出递推公式
// 第三步：根据递推公式，从前往后逐个进行计算

// 假设已知 f(0), f(1), ..., f(n-1)，如何根据题意求得 f(n) 呢？
// 1、不考虑任何边界，即假设给定的字符串全部由 1 和 2 组成，那么
// f(0) = 1, f(1) = 1, f(2) = 2, f(3) = 3, f(4) = 5, f(5) = 8 => f(n) = f(n-1)+f(n-2)
// 2、考虑边界
// if 第 n 项为 0，那么 f(n) = f(n-1)
// else if s[i-1]+s[i] > 26, 那么 f(n) = f(n-1)
// else f(n) = f(n-1) + f(n-2)

var numDecodings = function(s) {
  var slen = s.length
  if (slen === 0 || (slen === 1 && s[0] === '0')) return 0

  var res = Array(s.length + 1).fill(0)
  res[0] = 1
  res[1] = s[1] === '0' ? 0 : 1

  for (var i = 2; i <= slen; ++i) {
    if (s[i] !== '0') {
      res[i] = s[i-2]+s[i-1] <= 26
        ? res[i-1] + res[i-2]
        : res[i-1]
    }
  }
  return res[slen]
}

var numDecodings = function(s) {
  var slen = s.length
  if (slen === 0 || (slen === 1 && s[0] === '0')) return 0

  var res = Array(slen + 1).fill(0)
  res[slen] = 1
  res[slen - 1] = s[slen - 1] === '0' ? 0 : 1

  for (var i = slen - 2; i >= 0; --i) {
    if (s[i] !== '0') {
      res[i] = s[i]+s[i+1] <= 26
        ? res[i+1] + res[i+2]
        : res[i+1]
    }
  }
  return res[0]
}


var numDecodings = function(s) {
  var slen = s.length
  if (slen === 0 || (slen === 1 && s[0] === '0')) return 0

  var res = Array(s.length + 1).fill(0)
  res[0] = 1

  for (var i = 0; i < slen; ++i) {
    res[i+1] = s[i] === '0' ? 0 : res[i]
    if (i > 0 && (s[i-1] == '1' || (s[i-1] == '2' && s[i] <= '6'))) {
        res[i+1] += res[i-1]
    }
  }
  console.log(res)
  return res[slen]
}
