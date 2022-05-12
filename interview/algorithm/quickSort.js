/**
 快排算法原理
快速排序算法通过多次比较和交换来实现排序，其排序流程如下：

(1) 首先设定一个分界值（pivot）：通过该分界值将数组分成左右两部分（partition）。
(2) Compare and Swap：将大于或等于分界值的数据集中到数组右边，小于分界值的数据集中到数组的左边。此时，左边部分中各元素都小于或等于分界值，而右边部分中各元素都大于或等于分界值。
(3) Recursive：然后，左边和右边的数据可以独立排序。对于左侧的数组数据，又可以取一个分界值，将该部分数据分成左右两部分，同样在左边放置较小值，右边放置较大值。右侧的数组数据也可以做类似处理。
(4) 重复上述过程，可以看出，这是一个递归定义。通过递归将左侧部分排好序后，再递归排好右侧部分的顺序。当左、右两个部分各数据排序完成后，整个数组的排序也就完成了。
*/

function quickSort(arr) {
  return __quickSort(arr, 0, arr.length - 1)
}

function __quickSort(arr, startIndex, endIndex) {
  if (startIndex < endIndex) {
    const p = partion(arr, startIndex, endIndex)
    __quickSort(arr, startIndex, p - 1)
    __quickSort(arr, p + 1, endIndex)
  }
}

function partion(arr, startIndex, endIndex) {
  const target = arr[endIndex]
  let j = startIndex - 1
  for (let i = startIndex; i <= endIndex - 1; ++i) {
    if (arr[i] < target) {
      swap(arr, i, ++j)
    }
  }
  swap(arr, ++j, endIndex)
  return j
}

function swap(arr, i, j) {
  if (i == j) return

  [arr[i], arr[j]] = [arr[j], arr[i]]
}


// test

const arr = [2,3,5,1,8,3]
quickSort(arr)

console.log(arr)
