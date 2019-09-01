package com.java.algorithm.sort;

public class InsertSort {

  public static <T extends Comparable> T[] sort(T[] arr) {
    int length = arr.length;
    for(int i = 1; i < length; i++) {
      for(int j = i; j > 0 && arr[j].compareTo(arr[j-1]) < 0; j--) {
        T temp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = temp;
      }
    }

    return arr;
  }

  public static <T extends Comparable> T[] sort2(T[] arr) {
    int length = arr.length;
    for(int i = 1; i < length; i++) {

      // 寻找元素 arr[i] 合适的插入位置
      T e = arr[i];
      int j; // j 保存元素 e 应该插入的位置
      for(j = i; j > 0 && arr[j-1].compareTo(e) > 0; j--) {
        arr[j] = arr[j-1];
      }
      arr[j] = e;
    }

    return arr;
  }


}
