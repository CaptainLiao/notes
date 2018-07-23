/**
 * 构造矩形
 * https://leetcode-cn.com/problems/construct-the-rectangle/description/
 */

function getRect( target ) {
  let i = 1
  let j = target
  let temp
  while (i <= j) {
    temp = target / i
    if( ~~temp === temp ) {
      j = temp
    }
    ++i;
  }
  return [--i, j]
}

// test

let test = [20,10,2,4,80,2000]
test.forEach(item => {
  console.log(`给定值为：${item} => ${getRect(item)}`)
})

