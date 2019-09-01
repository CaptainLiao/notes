package com.java.algorithm.sort;

public class MainTest {
  public static void main(String[] args) {
    int n = 10000;
    Integer[] arr = SortTestHelper.generateRandomArray(n, 0, n);

    SortTestHelper.testSort(() -> InsertSort.sort(arr), "InsertSort.sort");

    SortTestHelper.testSort(() -> SelectionSort.sort(arr), "SelectionSort.sort");
  }
}
