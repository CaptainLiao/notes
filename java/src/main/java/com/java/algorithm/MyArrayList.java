package com.java.algorithm;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class MyArrayList<T> implements Iterable<T> {

  private static final  int DEFAULT_CAPACITY = 10;

  private int theSize;
  private T[] theItems;

  public MyArrayList() {
    doClear();
  }

  public void clear() {
    doClear();
  }

  public int size() {
    return theSize;
  }

  public boolean isEmpty() {
    return size() == 0;
  }

  public void trimToSize() {
    ensureCapacity( size() );
  }

  public T get(int idx) {
    if (idx < 0 || idx >= size()) {
      throw new ArrayIndexOutOfBoundsException();
    }
    return theItems[idx];
  }

  public T set(int idx, T newVale) {
    if (idx < 0 || idx >= size()) {
      throw new ArrayIndexOutOfBoundsException();
    }

    T old = theItems[idx];
    theItems[idx] = newVale;
    return old;
  }

  private void doClear() {
    theSize = 0;
    ensureCapacity( DEFAULT_CAPACITY );
  }

  public void ensureCapacity(int newCapacity) {
    if (newCapacity < size())
      return;

    T[] old = theItems;
    theItems = (T[]) new Object[ newCapacity ];
    for (int i = 0; i < size(); i++) {
      theItems[i] = old[i];
    }
  }

  public boolean add(T x) {
    add(size(), x);
    return true;
  }

  public void add(int idx, T x) {
    if (theItems.length == size()) {
      ensureCapacity(size() * 2 + 1);
    }

    for (int i = theSize; i > idx; i--) {
      theItems[i] = theItems[i - 1];
    }

    theItems[idx] = x;
    theSize++;
  }

  public T remove(int idx) {
    T removeItem = theItems[idx];
    for (int i = idx; i < size() - 1; i++) {
      theItems[i] = theItems[i + 1];
    }
    theSize--;
    return removeItem;
  }

  public Iterator<T> iterator() {
    return new ArrayListIterator();
  }

  private class ArrayListIterator implements Iterator<T> {
    private int current = 0;

    public boolean hasNext() {
      return current < size();
    }

    public T next() {
      if (!hasNext())
        throw new NoSuchElementException();

      return theItems[current++];
    }

    public void remove() {
      MyArrayList.this.remove(--current);
    }
  }
}














