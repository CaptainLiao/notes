
function quickSort(arr) {
  return __quickSort(arr, 0, arr.length - 1)
}

function __quickSort(arr, left, right) {
  if(right <= left) return
  
  let p = __partition(arr, left, right)
  __quickSort(arr, left, p - 1)
  __quickSort(arr, p + 1, right)
  return arr
}

function __partition(arr, left, right) {
  swap(arr, left, Math.floor((right + left + 1) / 2))
  let v = arr[left]
  let i = left + 1
  let j = right

  while(true) {
    while(i <= right && arr[i] < v) i++
    while(j >= left + 1 && arr[j] > v) j --
    
    if(i > j) break
    
    swap(arr, i, j) 
    i++
    j--
  }

  swap(arr, left, j) 
  return j
}

let arr = [3,1,8,11,2]
let o = quickSort(arr)
console.log(o)


function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

