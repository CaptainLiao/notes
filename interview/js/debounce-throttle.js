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
