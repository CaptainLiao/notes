/**
 * Promise/A+ spec:
 * https://promisesaplus.com/#notes
 * 
 * 主要实现构造器和 then
 */

const STATE = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

// TODO: 根据平台设置不同的值，如： MutationObserver, setImmediate, prosess.nextTick
const nextTick = cb => setTimeout(cb, 0)

const NOOP = r => r

class MyPromise {
  constructor(callback) {
    this.state = STATE.pending
    this.value = ''
    this.onFulfilledCallback = NOOP
    this.onRejectedCallback = NOOP

    const resolve = val => {
      nextTick(() => {
        if( this.state === STATE.pending ) {
          this.state = STATE.fulfilled
          this.value = val

          this.onFulfilledCallback()
          this.onFulfilledCallback = NOOP
        }
      })
    }

    const reject = reason => {
      nextTick(() => {
        if( this.state === STATE.pending ) {
          this.state = STATE.rejected
          this.value = reason
  
          this.onRejectedCallback()
          this.onRejectedCallback = NOOP
        }
      })
    }
    
    try {
      callback(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFulfilled = r => r, onRejected = e => {throw e}) {

    if( this.state === STATE.fulfilled ) {
      return new MyPromise((resolve, reject) => doResolve(onFulfilled, resolve, reject, this.value))
    }

    if( this.state === STATE.rejected ) {
      return new MyPromise((resolve, reject) => doReject(onRejected, resolve, reject, this.value))
    }

    if ( this.state === STATE.pending ) {
      return new MyPromise((resolve, reject) => {
        this.onFulfilledCallback = () => doResolve(onFulfilled, resolve, reject, this.value)
        this.onRejectedCallback = () => doReject(onRejected, resolve, reject, this.value)
      })
    }
  }

  catch(onReject) {
    return this.then(null, onReject)
  }

}

function doResolve(onResolve, resolve, reject, value) {
  nextTick(() => {
    try {
      const res = onResolve(value)
      if (res instanceof MyPromise) {
        res.then(resolve, reject)
      } else {
        resolve(res)
      }
    } catch (error) {
      reject(error)
    }  
  })
}

function doReject(onRejected, resolve, reject, value) {
  nextTick(() => {
    try {
      const res = onRejected(value)
      if (res instanceof MyPromise) {
        res.then(resolve, reject)
      } else {
        resolve(res)
      }
    } catch (error) {
      reject(error)
    }  
  })
}

// ===================== usage ===================== //

  var p = new MyPromise(resolve => {
    var o = {a : 1}
      resolve(o)
      o.b = 4
  })
    .then(res => {
      res.m = 4; 
      console.log('res', res)
      throw 'xxx'
    })
    .then(res => {
      res.m = 6; 
      console.log('res', res)
    })
    .catch(e => {
      console.log(e)
    })

  console.log("============")

  p.then(res => {
    console.log('res', res)
    return {x: 1}
  })

  setTimeout(() => {
    p.then(res => {
      console.log('res', res)
    })
  }, 1000)


