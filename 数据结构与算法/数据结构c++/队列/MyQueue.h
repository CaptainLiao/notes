/* 环形队列C++实现 2017-9-23 */

/* 使用const函数表明这个函数只可以 读取数据成员，
所以，当不希望函数对数据成员改变时就需要使用从const函数 */

#ifndef MYQUEUE_H
#define MYQUQUE_H 
class MyQueue 
{
	public:
		MyQueue(int queueCapacity); // 创建队列 
		virtual ~MyQueue();          // 销毁队列 
		void ClearQueue();          // 清空队列  
		bool QueueEmpty() const;    // 判空队列 
		bool QueueFull() const;     // 判满队列 
		int QueueLength() const;    // 队列长度 
		bool EnQueue(int element);  // 新元素入队 
		bool DeQueue(int &element); // 首元素出队 
		void QueueTraverse();       // 遍历队列 
	private:
		int *m_pQueue;    // 队列数组指针 
		int m_iHead;
		int m_iTail;
		int m_iQueueLen;  // 队列元素个数 
		int m_iQueueCapacity;	// 队列数组容量 
};

#endif
