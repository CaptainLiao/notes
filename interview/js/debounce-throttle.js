function debounce(fn, time) {
  let timer = null
  return function(...args) {
    const _this = this
    clearTimeout(timer)
    timer = setTimeout(function() {fn.call(_this, ...args)}, time)
  }
}


function throttle(fn, time) {
  let timeId = null

  return function(...args) {
    const _this = this
    if (!timeId) {
      timeId = setTimeout(function() {
        fn.apply(_this, args)
        timeid = null
      }, time)
    }
  }
}

function throttle2(fn, delay) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.call(this, ...args)
      lastTime = now
    }
  }
}
