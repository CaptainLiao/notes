/**
 * 生成一个 promise 的四种方法
 * new Promise((resolve, reject) => {})
 * Promise.all(arrary)
 * Promise.race(arrary)
 * Promise.resolve(value)
 * Promise.reject(reason)
 * 
 * @class Promise
 */
class Promise {
  constructor(excutor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined

    let resolve = value => {
      if( this.state === 'pending' ) {
        this.state = 'fulfilled'
        this.value = value
      }
    }
    let reject = reason => {
      if( this.state === 'pending' ) {
        this.state = 'rejected'
        this.reason = reason
      }
    }
    
    try {
      excutor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      if( this.state === 'fulfilled' ) {
        onFulfilled(this.value)
      }

      if( this.state === 'rejected' ) {
        onRejected(this.reason)
      }
    })

  }
}

Promise.wrap = fn => {
  let args = [].slice.call(arguments)

  return new Promise((resolve, reject) => {
    fn.apply(null, args.concat((e, data) => e ? reject(e) : resolve(data)) )
  })
}