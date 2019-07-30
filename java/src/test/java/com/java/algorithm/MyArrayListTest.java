package com.java.algorithm;

import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class MyArrayListTest {
  private MyArrayList<Integer> myArrayList;
  private Logger logger;

  @Before
  public void setUp() throws Exception {
    myArrayList = new MyArrayList<Integer>();
    logger = Logger.getLogger(MyArrayListTest.class);
  }

  @Test
  public void clear() {
  }

  @Test
  public void size() {
    System.out.println(myArrayList.size());
  }

  @Test
  public void isEmpty() {
  }

  @Test
  public void trimToSize() {
  }

  @Test
  public void get() {
  }

  @Test
  public void set() {
  }

  @Test
  public void ensureCapacity() {
  }

  @Test
  public void add() {
    myArrayList.add(55);
  }

  @Test
  public void remove() {
    assertEquals((int)myArrayList.remove(0), 55);
  }

  @Test
  public void iterator() {
  }
}
