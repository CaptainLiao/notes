/**
 * 电话号码的字母组合
 * https://leetcode-cn.com/explore/interview/card/top-interview-questions-medium/49/backtracking/91/
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 */

/**
 * 【分析】
 * 用map结构存储数字与字母的对应关系；
 * 遍历给定的数字字符串，找到数字在map中对应的字母数组，
 * 1、将第一个数字对应的字母数组与第二个数字对应的字母数组，进行双重遍历，得到一个新的字母数组，
 * 2、将新的字母数组与下一个数字对应的字母数组进行双重遍历， 得到一个新的字母数组，
 * 重复第2步操作，最后一个数组就是我们需要的字母组合。
 */

/**
 * @param {string} digits
 * @return {string[]}
 */

function letterCombinations(digits) {
  var o = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  }

  return digits
    .split('')
    .reduce((arr, d) => {
      let letters = [...o[d]]
      // 第一次reduce，arr数组为空
      if (!arr.length) return letters
        
      return arr.reduce((res, a) => res.concat(letters.map(b => a + b)), [])
    }, [])
}

// arr.reduce((res, a) => res.concat(letters.map(b => a + b)), []) 等同于
let res = []
for (let i = 0; i < arr.length; ++i) {
  for (let j = 0; j < letters.length; ++j) {
    res.push(arr[i] + letters[j])
  }
}
return res


