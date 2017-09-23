#include <iostream>
#include <stdlib.h>
#include "MyQueue.h"
using namespace std;

/* 环形队列检测 */

int main(void)
{
		cout << 5 << endl;
	// 定义环形队列
	MyQueue *p = new MyQueue(4);
	p -> EnQueue(12);
	p -> EnQueue(5);
	p -> QueueTraverse();
	
	cout << 5 << endl;
	
	delete p;
	p = NULL; 
	system("pause");
	return 0;
} 
