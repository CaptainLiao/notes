package com.java.algorithm.sort;

import java.util.Date;
import java.util.function.Supplier;

public class SortTestHelper {

  // 生成一个数组，含有 n 个随机元素，范围在[rangeL, rangeR]
  public static Integer[] generateRandomArray(int n, int rangeL, int rangeR) {
    assert (rangeL <= rangeR) : "xxxx";
    Integer[] arr = new Integer[n];
    for(int i = 0; i < n; ++i) {
      int r = (int) (Math.random() * 10);
      arr[i] = r % (rangeR - rangeL + 1) + rangeL;
    }
    return arr;
  }

  public static <T> void printArray(T[] arr) {
    for (T i : arr) System.out.print(i + " ");

    System.out.println();
  }

  public static void testSort(Supplier supplier) {
    long start = new Date().getTime();
    supplier.get();
    long end = new Date().getTime();

    System.out.println((end - start));
  }

  public static void main(String[] args) {
    Integer[] arr = SortTestHelper.generateRandomArray(10, 0, 10);
    printArray(arr);
  }
}
