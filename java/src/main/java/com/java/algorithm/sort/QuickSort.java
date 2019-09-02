package com.java.algorithm.sort;

public class QuickSort {

  public static <T extends Comparable> T[] sort(T[] arr) {
    __quickSort(arr, 0, arr.length - 1);
    return arr;
  }

  // 对 arr[l...r] 进行快速排序
  private static <T extends Comparable> void __quickSort(T[] arr, int l, int r) {
    if (l >= r) return;

    int p = __partition(arr, l, r);
    __quickSort(arr, l, p - 1);
    __quickSort(arr, p+1, r);
  }

  // 对 arr[l...r] 部分进行 partition 操作
  // 返回 int p，使得 arr[l...p-1] < arr[p], arr[p+1...r] > arr[p]
  private static <T extends Comparable> int __partition(T[] arr, int l, int r) {
    T v = arr[l];
    // arr[l+1...j] < v && arr[j+1...i) > v
    int j = l;
    for(int i = l + 1; i <= r; ++i) {
      if (arr[i].compareTo(v) < 0) {
        __swap(arr, j + 1, i);
        ++j;
      }
    }
    __swap(arr, l, j);
    return j;
  }

  private static <T> void __swap(T[] arr, int i, int j) {
    T temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
