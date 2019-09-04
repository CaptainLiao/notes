package com.java.algorithm.leetcode;

public class _148_SortList {
  class ListNode {
    int val;
    ListNode next;
    ListNode(int v) {
      val = v;
    }
  }

  public ListNode sortList(ListNode head) {
    // 自顶向下的归并排序

    if (head.next == null) return head;

    ListNode p = head;
    ListNode q = head;
    ListNode prep = null;

    while( q != null && q.next != null ) {
      prep = p;
      p = p.next;
      q = q.next.next;
    }
    prep.next = null;

    ListNode left = sortList(head);
    ListNode right = sortList(p);
    // 对两个有序链表进行归并操作
    return merge(left, right);
  }

  private ListNode merge(ListNode left, ListNode right) {
    ListNode head = new ListNode(0);

    while(left != null && right != null) {
      if (left.val < right.val) {
        head.val = left.val;
        head.next = left;
        left = left.next;

      } else {
        head.val = right.val;
        head.next = right;
        right = right.next;
      }

    }

    if (left != null) head.next = left;
    if (right != null) head.next = right;

    return head;
  }

}




