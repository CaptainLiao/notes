function waitSecond(second) { 
  return new Promise(resolve => setTimeout(() => {
  }, Number(second) * 1000))
}


var a = waitSecond(1).then(() => console.log('a'))
var b = waitSecond(2).then(() => console.log('b'))

var c = Promise.all([
  a(),
  b()
])
.then(() => console.log(c))
.catch(e => console.error(e))