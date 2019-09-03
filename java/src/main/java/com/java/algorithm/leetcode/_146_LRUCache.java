package com.java.algorithm.leetcode;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class _146_LRUCache {
  private Map<Integer, Integer> cache;
  private int capacity;

  public _146_LRUCache(int capacity) {
    this.capacity = capacity;
    this.cache = new LinkedHashMap<>(capacity);
  }

  public int get(int key) {
    Integer v = cache.get(key);
    if (v == null) return -1;

    cache.remove(key);
    cache.put(key, v);
    return v;
  }

  public void put(int key, int value) {
    boolean containKey = get(key) != -1;
    if (containKey) {
      cache.remove(key);
    } else if (cache.size() == this.capacity) {
      // delete
      Iterator<Map.Entry<Integer, Integer>> iterator = cache.entrySet().iterator();
      iterator.next();
      iterator.remove();
    }

    cache.put(key, value);
  }

  public static void main(String[] args) {
    _146_LRUCache cache = new _146_LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);       // 返回  1
    cache.put(3, 3);    // 该操作会使得密钥 2 作废
    cache.get(2);       // 返回 -1 (未找到)
    cache.put(4, 4);    // 该操作会使得密钥 1 作废
    cache.get(1);       // 返回 -1 (未找到)
    cache.get(3);       // 返回  3
    cache.get(4);       // 返回  4
  }
}
