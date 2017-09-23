#include "MyQueue.h"
#include <iostream> 
using namespace std;
/* 初始化队列  */ 
MyQueue::MyQueue(int queueCapacity)
{
	m_iQueueCapacity = queueCapacity; // 队列容量
	m_pQueue = new int[m_iQueueCapacity]; // 指针指向申请的内存空间 
	ClearQueue();
} 
/* 销毁队列 */ 
MyQueue::~MyQueue()
{
	delete []m_pQueue; // 对应new
	m_pQueue = NULL; 
} 
/* 清空队列 */
void MyQueue::ClearQueue()
{
	m_iHead = m_iTail = 0;  // 队头和队尾为0
	m_iQueueLen = 0;
}

bool MyQueue::QueueEmpty() const
{
	return m_iQueueLen == 0;
	// return m_iQueueLen == 0 ? true : false;
}

bool MyQueue::QueueFull() const
{
	return m_iQueueLen == m_iQueueCapacity;
 } 

int MyQueue::QueueLength() const
{
	return m_iQueueLen;
}

/* 入队 */
bool MyQueue::EnQueue(int element)
{
	if(QueueFull()) return false;
	
	m_pQueue[m_iTail] = element;
	++m_iTail;
	m_iTail = m_iTail%m_iQueueCapacity;
	++m_iQueueLen; 
	return true;
} 
 
/* 出队 */
bool MyQueue::DeQueue(int &element)
{
	if(QueueEmpty()) return false;
	
	element = m_pQueue[m_iHead];
	++m_iHead;
	m_iHead = m_iHead % m_iQueueCapacity; 
	--m_iQueueLen; 
	return true;
}

/* 遍历队列 */
void MyQueue::QueueTraverse()
{
	for(int i = m_iHead; i < m_iHead+m_iQueueLen; ++i)
	{
		cout << m_pQueue[i % m_iQueueCapacity] << endl;
	}
 } 


