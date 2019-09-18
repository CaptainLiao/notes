package com.java.algorithm.heap;

public class MaxHeap<T extends Comparable> {
  private T data[];
  private int size;
  private int capacity;

  private void __shiftUp(int k) {
    int parentIndex = k/2;
    while (k > 1 && data[k].compareTo(data[parentIndex]) > 0) {
      __swap(data, k, parentIndex);
      k = k/2;
    }
  }

  private void __swap(T[] arr, int i, int j) {
    T temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  private void __shiftDown(int k) {
    while (2*k <= size) {
      int j = 2*k; // 在本次循环中， data[k] 和 data[j] 交换位置

      // 有右孩子，且有孩子大于左孩子
      if (j + 1 <= size && data[j+1].compareTo(data[j]) > 0) j += 1;

      if (data[k].compareTo(data[j]) >= 0) break;

      __swap(data, k, j);
      k = j;
    }
  }

  MaxHeap(int capacity) {
    this.capacity = capacity;
    size = 0;
    data = (T[]) new Object[capacity];
  }

  public void insert(T item) {
    assert (size + 1 <= capacity);
    data[size + 1] = item;
    size++;

    __shiftUp(size);
  }

  public T extractMax() {
    assert (size > 0);

    T max = data[1];
    data[1] = data[size];
    --size;

    __shiftDown(1);

    return max;
  }

  public int size() {
    return size;
  }

  public boolean isEmpty() {
    return size == 0;
  }
}
