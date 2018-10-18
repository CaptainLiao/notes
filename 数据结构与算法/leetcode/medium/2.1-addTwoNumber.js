/**
 * 两数相加
给定两个非空链表来表示两个非负整数。位数按照逆序方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。
你可以假设除了数字 0 之外，这两个数字都不会以零开头。

示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
 */

function ListNode (val) {
  this.val = val;
  this.next = null;
}

function addTwoNumber(l1, l2) {
  let res = new ListNode();
  let n = 0;
  let k = res;

  while (l1 || l2 || n) {
    let v1 = l1 && l1.val || 0
    let v2 = l2 && l2.val || 0
    let t = v1 + v2 + n
    n = ~~(n/10);
    
    k.next = new ListNode()
    k = k.next;
    k.val = t%10;

    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }
  return res.next;
}
