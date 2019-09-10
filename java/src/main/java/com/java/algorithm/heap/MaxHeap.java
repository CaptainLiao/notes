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

  public int size() {
    return size;
  }
  public boolean isEmpty() {
    return size == 0;
  }
}
