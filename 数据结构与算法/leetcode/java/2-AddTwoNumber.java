/**
Definition for singly-linked list

public class NodeList {
  int val;
  NodeList next;
  NodeList(int val){
    this.val = val;
  }
} 
*/
class AddTwoNumber {
  public NodeList AddTwoNumbers(NodeList l1, NodeList l2) {
    NodeList head = new NodeList(0);
    NodeList current = head;
    NodeList p1 = l1;
    NodeList p2 = l2;
    int remain = 0;

    while(p1 != null || p2 != null || remain > 0) {
      int x = p1 == null ? 0 : p1.val;
      int y = p2 == null ? 0 : p2.val;
      int sum = x + y + remain;
      remain = sum / 10;
      
      // 尾插法
      current.next = new NodeList(sum % 10);
      current = current.next;
    }

    return head.next;
  }
}