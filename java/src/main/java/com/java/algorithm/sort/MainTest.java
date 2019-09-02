package com.java.algorithm.sort;

import java.util.Arrays;

public class MainTest {
  public static void main(String[] args) {
    int n = 10000;
    Integer[] arr = SortTestHelper.generateRandomArray(n, 0, n);
    Integer[] arr2 = Arrays.copyOf(arr, n);
    Integer[] arr3 = Arrays.copyOf(arr, n);
    Integer[] arr4 = Arrays.copyOf(arr, n);
    Integer[] arr5 = Arrays.copyOf(arr, n);

    SortTestHelper.testSort(() -> InsertSort.sort(arr), "InsertSort.sort");
    SortTestHelper.testSort(() -> InsertSort.sort2(arr3), "InsertSort.sort2");

    SortTestHelper.testSort(() -> SelectionSort.sort(arr2), "SelectionSort.sort");

    SortTestHelper.testSort(() -> MergeSort.sort(arr4), "MergeSort.sort");
    SortTestHelper.testSort(() -> MergeSort.sortBU(arr5), "MergeSort.sortBU");
  }
}
