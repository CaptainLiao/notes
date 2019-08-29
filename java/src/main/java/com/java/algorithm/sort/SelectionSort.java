package com.java.algorithm.sort;

public class SelectionSort {
  public static <T extends Comparable> T[] sort(T[] arr) {
    int length = arr.length;
    for (int i = 0; i < length; i++) {
      int minIndex = i;
      for (int j = i + 1; j < length; j++) {
        if (arr[j].compareTo(arr[minIndex]) < 0) {
          minIndex = j;
        }
      }
      T temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;
  }

  public static void main(String[] args) {
    Integer[] arr = {1,5,3,9,7};
    SelectionSort.sort(arr);
    for (int i: arr) {
      System.out.println(i);
    }
  }
}
