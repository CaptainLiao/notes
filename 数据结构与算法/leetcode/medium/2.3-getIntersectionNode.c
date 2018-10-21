struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
	// 将链表位移至公共长度
	struct ListNode *a = headA;
	struct ListNode *b = headB;
	while (a && b) {
		a = a->next;
		b = b->next;
	}

	struct ListNode *pa= headA;
	struct ListNode *pb= headB;
	// 将较长的链表从头部向后移动 |lenA - lenB| 位
	while (a) {
		a = a->next;
		pa = pa->next;
	}
	while (b) {
		b = b->next;
		pb = pb->next;
	}

	// 经过上一步操作，两个链表剩余长度相等
	// 于是逐个比较大小，相等即为相交
	while (a) {
		if (a->val == b->val) return a;
		a = a->next;
		b = b->next;
	}
	return NULL;
}

