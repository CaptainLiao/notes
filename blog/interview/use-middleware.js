let data = []

class App {

  constructor() {
    data = []
  }

  use(...fns) {
    const notFn = fns.find(fn => typeof fn !== 'function')
    if (notFn) {
      console.error(`参数${notFn}需要函数类型`)
      return 
    }

    data = data.concat(fns)
  }

  run() {
    data.reduce((p, fn) => p.then(() => new Promise(resolve => fn(resolve))), Promise.resolve())
  }

  run2() {
    const len = data.length

    const next = i => () => {
      if (i > len - 1) return

      data[i](next(i + 1))
    }

    next(0)()
  }

  async run3() {
    for(let fn of data) {
      await new Promise(resolve => fn(resolve))
    }
  }
}

// test

const app = new App()

app.use(next => setTimeout(() => {
  console.log(1)
  next()
}, 1000))

app.use(next => {
  console.log(2)
  next()
})

app.run3()


