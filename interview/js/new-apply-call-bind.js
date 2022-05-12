
// 1. 创建一个新的空对象
// 2. 将函数的prototype对象赋值给新对象的 __proto__ 属性
// 3. 将新对象作为函数的this进行调用
// 4. 若函数没有返回对象，则返回这个新对象
function mynew(ctor, ...args) {
  const obj = {}
  obj.__proto__ = ctor.prototype
  const res = ctor.apply(obj, args)
  if (res instanceof Object) return res
  return obj
}

// 把函数作为对象的方法进行调用，改变原函数的 this 指向
Function.prototype.call2 = function(that, ...args) {
  if (that === undefined || that === null) {
    that = window
  }
  if (typeof that !== 'object') {
    that = Object(that)
  }
  const fn = Symbol()

  that[fn] = this
  const res = that[fn](...args)
  delete that[fn]
  return res
}

// 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
Function.prototype.bind2 = function(that, ...args) {
  if (that === undefined || that === null) {
    that = window
  }
  if (typeof that !== 'object') {
    that = Object(that)
  }

  const self = this

  return function(...params) {
    self.call(that, ...args, ...params)
  }
}