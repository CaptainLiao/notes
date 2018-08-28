#include "MyQueue.h"
#include <iostream> 
using namespace std;
/* ?????????  */ 
MyQueue::MyQueue(int queueCapacity)
{
	m_iQueueCapacity = queueCapacity; // ????????
	m_pQueue = new int[m_iQueueCapacity]; // ???????????????? 
	ClearQueue();
} 
/* ??????? */ 
MyQueue::~MyQueue()
{
	delete []m_pQueue; // ???new
	m_pQueue = NULL; 
} 
/* ?????? */
void MyQueue::ClearQueue()
{
	m_iHead = m_iTail = 0;  // ??????��?0
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

/* ??? */
bool MyQueue::EnQueue(int element)
{
	if(QueueFull()) return false;
	
	m_pQueue[m_iTail] = element;
	++m_iTail;
	m_iTail = m_iTail%m_iQueueCapacity;
	++m_iQueueLen; 
	return true;
} 
 
/* ???? */
bool MyQueue::DeQueue(int &element)
{
	if(QueueEmpty()) return false;
	
	element = m_pQueue[m_iHead];
	++m_iHead;
	m_iHead = m_iHead % m_iQueueCapacity; 
	--m_iQueueLen; 
	return true;
}

/* ???????? */
void MyQueue::QueueTraverse()
{
	for(int i = m_iHead; i < m_iHead+m_iQueueLen; ++i)
	{
		cout << m_pQueue[i % m_iQueueCapacity] << endl;
	}
 } 


