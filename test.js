function wait(second) { 
  return new Promise(resolve => setTimeout(() => {
    console.log('tick')
    resolve()
  }, Number(second) * 1000))
}


var c = () => wait(1)
  .then(() => 'c')

var b = () => wait(1)
  .then(() => {
    console.log('b')
    return c()
  })

var a = () => wait(1)
  .then(() => {
    console.log('a')
    return b()
  })
  .then(res => console.log('res', res))
  .catch(e => console.error(e))

a()