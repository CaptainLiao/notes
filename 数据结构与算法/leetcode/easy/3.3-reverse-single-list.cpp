/**
反转链表
反转一个单链表。

示例:
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
*/

// 方法一：头插法O(n)
ListNode* reverseList(ListNode* head) {
  ListNode* h = head;
  ListNode* root = NULL;
  ListNode* next = NULL;

  while (h) {
    next = h->next;
    h->next = root;
    root = h;
    h = next;
  }
  return root;
}

/**
方法二：递归
假设递归前链表结构为 1->2->3->4->5，每次递归都将函数入栈，当递归到底后后逐个弹出并执行。

第一次执行函数，
head 为：5->NULL
res结构为：5->NULL

第二次执行函数前：
head 为：4->5->NULL
res 为：5->NULL
完成后：
head 为：4->NULL
res 为：5->4->NULL

第三次执行函数前：
head 为：3->4->NULL
res 为：5->4->NULL
完成后：
head 为：3->NULL
res 为：5->4->3->NULL
...
*/
ListNode* reverseList2(ListNode* head) {
  if (head == NULL || head->next == NULL) return head;

  ListNode* res = reverseList2(head->next);
  head->next->next = head;
  head->next = NULL;
  return res;
}