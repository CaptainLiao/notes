/**
删除链表中的节点
请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。

https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/6/linked-list/41/
*/

/**
struct Nodelist {
  int val;
  NodeList* next;
  NodeList (int val): val(val), next(NULL) {}
}
*/
void deleteNode (ListNode* node) {
  if (node == NULL || node->next == NULL) return;

  ListNode* temp = node->next;
  node->val = temp->val;
  node->next = temp->next;
  free(temp);
}
