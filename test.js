function insertSort(arr) {
  var i;
  var j;
  var temp;
  for( i = 1; i < arr.length; ++i ) {
    temp = arr[i];
    for( j = i - 1; j >= 0 && arr[j] > temp; --j ) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = temp;
  }
  return arr;
}

var a = [5,2, 4,11,3]
console.log(insertSort(a))
