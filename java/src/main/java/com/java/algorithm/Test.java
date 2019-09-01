package com.java.algorithm;

import java.util.LinkedList;
import java.util.List;

public class Test {
  public static void main(String[] args) {
    String a = "abcd";
    String b = "1";
    Long c = 122L;

    List<String> list = new LinkedList<String>();
    System.out.println(a.replace("cd", "e"));
    System.out.println(a.replaceAll("cd", "e"));
  }
}
