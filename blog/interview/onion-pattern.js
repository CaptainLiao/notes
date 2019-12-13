class App {
  constructor() {
    this.middleware = []
  }

  use(...args) {
    this.middleware = [...this.middleware, ...args]
  }

  run() {
    
    compose(this.middleware)

  }
}

function compose(middleware) {
  return function(context, next) {
    let index = -1
    return dispatch(0)

    function dispatch(i) {
      if (i <= index) return Promise.reject('xxx')

      let fn = middleware(index = i)
      if ( i === middleware.length ) fn = next
      if (!fn) return Promise.resolve

      return Promise.resolve(fn(context, () => dispatch(i + 1)))
    }
  }
}


