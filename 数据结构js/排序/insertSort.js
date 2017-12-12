/**
 * 插入排序：
 * 遍历数组（第一层循环），将当前元素和前一个元素进行比较（第二层循环），如果当前元素更小，则交换位置
 * 继续比较，直到当前元素下标为0或者当前元素比前一个元素大，跳出第二层循环继续第一层循环。
 * 
实现过程：
 
+---->5 3 2 6 1 9 4 8 7 
|从index为1开始遍历数组，将 3 和 5 比较，3 < 5，调换 3 5 的位置，此时，3 前面没有数字了，index++
+---->3 5 2 6 1 9 4 8 7
|将 2 和 3 比较，2 < 3,调换 2 3 的位置；
}2 前面有 5，继续比较 2 和 5，2 < 5，调换 2 5 的位置，index++
+---->2 3 5 6 1 9 4 8 7

 */

function insertSort(arr) {
  var len = arr.length;
  for( var i = 1; i < len; i++) {

    // 寻找元素arr[i]合适位置进行插入
    // 将当前元素和前一个元素比较大小
    // 第二层循环可以提前结束
    for( var j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap.call(arr, j, j-1)
    }
  }
  return arr;
}

function swap(a, b) {
  var _this = this;
  if(_this.length < 0) throw new Error('['+_this + '] is not Array');
  var temp = this[a];
  this[a] = this[b];
  this[b] = temp;
}


var t = [4,5,9,4,2,1]

console.log(insertSort(t))
