#include <iostream>
#include <cassert>
#include "UnionFindTestHelper.h"

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

using namespace std;

int main() {
	
	int n = 10000000;
	
	//UnionFindTestHelper::testUF1(n);
	
	UnionFindTestHelper::testUF2(n);
	
	UnionFindTestHelper::testUF3(n);
	
	UnionFindTestHelper::testUF4(n);
	
	return 0;
}
