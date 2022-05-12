
const add1 = n1 => n2 => n3 => n1 + n2 + n3

const add2 = (...args) => args.reduce((sum, i) => sum + i, 0)

function curring(fn) {
  let params = []
  return function t(...args) {
    if (fn.length === params.length) {
      const res = fn.apply(this, params)
      params = []
      return res
    }

    params = [...params, ...args]
    return t
  }
}

const add = curring(add2, 3)





