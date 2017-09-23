/* ���ζ���C++ʵ�� 2017-9-23 */

/* ʹ��const���������������ֻ���� ��ȡ���ݳ�Ա��
���ԣ�����ϣ�����������ݳ�Ա�ı�ʱ����Ҫʹ�ô�const���� */

#ifndef MYQUEUE_H
#define MYQUQUE_H 
class MyQueue 
{
	public:
		MyQueue(int queueCapacity); // �������� 
		virtual ~MyQueue();          // ���ٶ��� 
		void ClearQueue();          // ��ն���  
		bool QueueEmpty() const;    // �пն��� 
		bool QueueFull() const;     // �������� 
		int QueueLength() const;    // ���г��� 
		bool EnQueue(int element);  // ��Ԫ����� 
		bool DeQueue(int &element); // ��Ԫ�س��� 
		void QueueTraverse();       // �������� 
	private:
		int *m_pQueue;    // ��������ָ�� 
		int m_iHead;
		int m_iTail;
		int m_iQueueLen;  // ����Ԫ�ظ��� 
		int m_iQueueCapacity;	// ������������ 
};

#endif
