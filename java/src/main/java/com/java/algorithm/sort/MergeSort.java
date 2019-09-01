package com.java.algorithm.sort;


import java.lang.reflect.Array;

public class MergeSort {
  public static <T extends Comparable> T[] sort(T[] arr) {
    mergeSort(arr, 0, arr.length - 1);
    return arr;
  }

  private static <T extends Comparable> void mergeSort(T[] arr, int left, int right) {
    if (left >= right) return;

    int mid = (right + left)/2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  private static <T extends Comparable> void merge(T[] arr, int left, int mid, int right) {
    T[] copies = (T[]) Array.newInstance(arr.getClass().getComponentType(), right - left + 1);

    for (int i = left; i <= right; i++) {
      copies[i - left] = arr[i];
    }

    int i = left;
    int j = mid + 1;

    for (int k = left; k <= right; ++k ) {
      if (i > mid) {
        arr[k] = copies[j - left];
        j++;
      } else if (j > right) {
        arr[k] = copies[i - left];
        i++;
      } else if (copies[i - left].compareTo(copies[j - left]) < 0) {
        arr[k] = copies[i - left];
        i++;
      } else {
        arr[k] = copies[j - left];
        j++;
      }
    }
  }
}
