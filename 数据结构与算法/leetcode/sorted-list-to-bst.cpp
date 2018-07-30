
/**
 * 有序链表转换二叉搜索树
 * https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/description/
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

/**
给定的有序链表： [-10, -3, 0, 5, 9],一个可能的答案是：[0, -3, 9, -10, null, 5]
找到中间元素的过程：指针s、f指向头结点，f每次移动两个位置，s移动一个位置，直到f为空。
初始化结果：
-10 -3 0 5 9 
 s
 f
第一次循环，f移动两个节点，s移动一个节点，结果为：
-10 -3 0 5 9
    s
       f
第二次循环，f再次移动两个节点，s移动一个节点：
-10 -3 0 5 9
       s
           f
此时，s指向的节点，就是链表的中间节点，查找的时间复杂度为O(log(n))

注意递归到底的情况：
-10 -3
 s
 f
*/

class Solution {
  public:
    TreeNode* sortedListToBST(ListNode* head) {
      if( head == NULL ) return head;

      TreeNode* slow = head;
      TreeNode* fast = head;
      TreeNode* last = head;
      while( fast->next && fast->next->next ) {
        last = slow;
        slow = slow->next;
        fast = fast->next->next;
      }
      fast = slow->next;
      // 这一步将链表截断在 last 节点这个位置
      // 如果省略，链表不会被改变
      last->next = NULL;

      TreeNode* r = new TreeNode(slow->val);
      // 如果单增链表的长度小于3，就不能移动，此时，左孩子应为空
      if(slow != head) r->left = sortedListToBST(head);
      r->right = sortedListToBST(fast);
      return r;
    }
}