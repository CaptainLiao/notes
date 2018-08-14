// 删除链表的倒数第N个节点
// https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/6/linked-list/42/

/**
使用 O(n) 的时间复杂度完成，
1: 使用双指针p1,p2，它们的间隔为 n。当 p2 指向链表末尾时，p1 指向的节点就是待删除节点。
2: 删除节点
*/
NodeList* removeNthFromEnd (NodeList* head, int n) {
  if (head == NULL) return head;

  NodeList* p1 = head;
  NodeList* p2 = head;
  // 找到待删除的节点
  while (n-- != 0) p2 = p2->next;
  if (p2 == NULL) return head->next;
  while (p2->next) {
    p1 = p1->next;
    p2 = p2->next;
  }
  // 删除节点
  p1->next = p1->next->next;
  
  return head;
}
