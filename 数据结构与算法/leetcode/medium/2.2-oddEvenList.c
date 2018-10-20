/**
 *
 * Definition for singly-linked list.
 * struct ListNode {
 *	int val;
 *	struct ListNode *next;
 * };
 *
 * */


struct ListNode* oddEvenList(struct ListNode *head) {
	if (head == NULL) return head;

	// 将原链表根据位置的奇偶性，拆分成奇偶两个链表
	struct ListNode *odd = head;
	struct ListNode *even = odd->next;
	// 保存偶链表
	struct ListNode *evenList = even;

	while(even && even->next) {
		odd->next = even->next;
		odd = odd->next;

		even->next = odd->next;
		even = even->next;
	}

	odd->next = evenList;
	return head;
}

