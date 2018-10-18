struct ListNode {
  int val;
  struct ListNode *next;
}

struct ListNode *addTwoNumbers(struct ListNode *l1, struct ListNode *l2) {
  struct ListNode *res = (struct ListNode *)malloc(sizeof(struct ListNode));
  res->next = NULL;
  struct ListNode *t = res;

  while (l1 || l2 || n) {
    int v1 = 0;
    int v2 = 0;
    if (l1) {
      v1 = l1->val;
      l1 = l1->next;
    }
    if (l2) {
      v2 = l2->val;
      l2 = l2->next;
    }
    
    int v = v1 + v2 + n;
    n = v/10;

    struct ListNode *m = (struct ListNode *)malloc(sizeof(struct ListNode));
    m->next = NULL;
    t->next = m;
    t = t->next;
    t->val = v%10;
  }
  return res->next;
}
