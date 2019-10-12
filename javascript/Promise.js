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

const STATE = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

let value, reason

const onFulfilledQueue = []
const onRejectedQueue = []
const NOOP = r => r

class MyPromise {
  constructor(excutor) {
    this.state = STATE.pending

    const resolve = v => {
      if( this.state === STATE.pending ) {
        this.state = STATE.fulfilled
        value = JSON.parse(JSON.stringify(v))

        onFulfilledQueue.forEach(fn => fn(value))
      }
    }

    const reject = r => {
      if( this.state === STATE.pending ) {
        this.state = STATE.rejected
        reason = JSON.parse(JSON.stringify(r))

        onRejectedQueue.forEach(fn => fn(value))
      }
    }
    
    try {
      excutor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFulfilled = NOOP, onRejected = NOOP) {

    if( this.state === STATE.fulfilled ) {
      
    }

    if( this.state === STATE.rejected ) {
      
    }

    if ( this.state = STATE.pending ) {
      //
    }
  }

}

// ===================== usage ===================== //

// var p = new MyPromise(resolve => {
//   setTimeout(() => {
//     var o = {a : 1}
//   resolve(o)
//   o.b = 4
//   }, 1000);
// })
//   .then(res => {
//     res.m = 4; 
//     console.log(res)
//   })
//   .then(res => {
//     res.m = 4; 
//     console.log('res', res)
//   })

  var p = new Promise(resolve => {
    setTimeout(() => {
      var o = {a : 1}
    resolve(o)
    o.b = 4
    }, 1000);
  })
    .then(res => {
      res.m = 4; 
      console.log(res)
      return res
    })
    .then(res => {
      res.m = 6; 
      console.log(res)
    })

console.log(p)
