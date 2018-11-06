/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var o = nums.reduce((obj, item) => {
        obj[item] = ~~obj[item] + 1
        return obj
    }, {})
    
    var res = Object.keys(o)
        .reduce((a, k) => a.concat([{k: k, v: o[k]}]), [])
        .sort((a, b) => b.v - a.v)
        .slice(0, k)
        .map(item => ~~item.k)
    
    return res
};


function quickSort(arr) {
  __quickSort(arr, 0, arr.length-1)
}

function __quickSort(arr, left, right) {
  if (left > right) return
  let mid = __partition(arr, left, right)
  __quickSort(arr, left, mid-1)
  __quickSort(arr, mid+1, right)
}

function __partition(arr, left, right) {
  var target = arr[left]
  var i = left + 1
  var j = right
  while (true) {
    while (i <= right && arr[i] <= target) ++i
    while (j >= left + 1 && arr[j] >= target) --j

    if (i > j) break
    
    swap(arr, i, j)
    ++i
    --j
  }
  swap(arr, left, j)
}

function swap(arr, i, j) {
  var t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}
