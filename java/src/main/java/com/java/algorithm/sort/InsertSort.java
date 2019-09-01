package com.java.algorithm.sort;

public class InsertSort {

  public static <T extends Comparable> T[] sort(T[] arr) {
    int length = arr.length;
    for(int i = 1; i < length; i++) {
      for(int j = i; j > 0; j--) {
        if(arr[j].compareTo(arr[j-1]) <  0) {
          T temp = arr[j];
          arr[j] = arr[j-1];
          arr[j-1] = temp;
        }
      }
    }

    return arr;
  }


}
