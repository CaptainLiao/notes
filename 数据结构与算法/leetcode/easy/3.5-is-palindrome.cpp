/**
回文链表:https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/6/linked-list/45/
请判断一个链表是否为回文链表。

示例 1:
输入: 1->2
输出: false

示例 2:
输入: 1->2->2->1
输出: true

进阶：
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
*/

/**
解法一：
使用快(fast)慢(slow)指针遍历链表，遍历完成时，slow指针指向链表中间节点；
翻转以slow为头结点的链表，并赋值给slow指针；
一一比较slow链表和head链表的值，如果其中一个不相等，则返回false，否则返回true。

解法二：
逐一将链表的值保存在vector数组中；
两端到中间同时遍历vector数组，若值不相等，则返回false，否则返回true
*/
ListNode* reverseLists(ListNode* head) {
  if (head == NULL || head->next == NULL) return head;

  ListNode* res = reverseLists(head->next);
  head->next->next = head;
  head->next = NULL;
  return res;
}

bool isPalindrome(ListNode* head) {
  ListNode* slow = head;
  ListNode* fast = head;

  // 以O(lg n)的时间复杂度遍历链表，完成后slow指针指向中间节点
  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
  }
  // 此时slow指针指向中间节点，翻转以slow为头节点的链表
  slow = reverseLists(slow);
  
  while (slow) {
    if (slow->val != head->val) return false;
  }
  return true;
}
