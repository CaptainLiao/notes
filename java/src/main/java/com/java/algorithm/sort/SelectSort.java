package com.java.algorithm.sort;

import java.util.Arrays;
import java.util.List;

public class SelectSort {
  public static List<Integer> sort(List<Integer> list) {
    for (int i = 0; i < list.size(); i++) {
      int min = list.get(i);
      int minIndex = i;
      for (int j = i + 1; j < list.size(); j++) {
        int cur = list.get(j);
        if (cur < min) {
          min = cur;
          minIndex = j;
        }
      }
      int temp = list.get(i);
      list.set(i, min);
      list.set(minIndex, temp);
    }
    return list;
  }

  public static void main(String[] args) {
    List<Integer> arr = Arrays.asList(1,23,4);
    SelectSort.sort(arr);
    for (int i: arr) {
      System.out.println(i);
    }
  }
}
