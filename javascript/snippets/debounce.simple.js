/**
 * debounce
 * 函数防抖——最终执行一次
 * @param {function} func 
 * @param {number} wait 
 */

export default function debounce(func, wait) {
  let timeId = null

  const debouncded = function() {
    debouncded.clear()
  
    timeId = setTimeout(func, wait)
  }

  debouncded.clear = function() {
    if (timeId) {
      clearTimeout(timeId)
      timeId = null
    }
  }


  return debouncded;
}
