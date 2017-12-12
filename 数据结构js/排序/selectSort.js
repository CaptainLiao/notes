/**
选择排序算法

实现过程：
 
+---->5 3 2 6 1 9 4 8 7 
|遍历数组，找最小值(1)和未排序数组的第一位(5)交换位置
+---->1 3 2 6 5 9 4 8 7
|遍历未排序数组，找到最小值(2)和剩余未排序数组第一位(3)交换位置
+---->1 2 3 6 5 9 4 8
...
 */

var selectSort = function(arr) {
  var temp;
  for( var i = 0, len = arr.length; i < len; i++) {

    // 找到[i, len]区间中的最小值
    var minIndex = i
    for( var j = i + 1; j < len; j++) {
      if( less(arr[j], arr[minIndex]) ) minIndex = j;
    }

    // 交换位置
    swap.call(arr, minIndex, i)
  }
  return arr;
}

//============= helper ===============
function swap(a, b) {
  var _this = this;
  if(_this.length < 0) throw new Error('['+_this + '] is not Array');
  var temp = this[a];
  this[a] = this[b];
  this[b] = temp;
}

function less(a, b) {
  return a < b
}

var t = [4,5,9,4,2,1]

console.log(selectSort(t))
