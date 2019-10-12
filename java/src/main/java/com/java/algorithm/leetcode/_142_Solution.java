package com.java.algorithm.leetcode;

import java.util.HashSet;
import java.util.Set;

public class _142_Solution {
  class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
      val = x;
      next = null;
    }
  }
  public ListNode detectCycle(ListNode head) {
    Set<ListNode> s = new HashSet();

    while (head != null && !s.contains(head)) {
      s.add(head);
      head = head.next;
    }

    return head;
  }
}
