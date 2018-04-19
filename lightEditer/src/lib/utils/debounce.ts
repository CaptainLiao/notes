export default function debounce(fn:Function, delay:number = 100) {
  let timer:any = null
  return function() {
    let args = arguments
    let _this = this
    clearTimeout(timer)

    timer = setTimeout(() => fn.apply(_this, args), delay)
  }
}