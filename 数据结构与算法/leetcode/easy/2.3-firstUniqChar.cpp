/**
给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

案例:
s = "leetcode"
返回 0.
s = "loveleetcode",
返回 2.
*/
int firstUniqChar(string s) {
  for( int i = 1; i < s.length(); i++ ) {
    if(s[i-1] = s[i]) return i-1;
  }
  return -1;
}

// ABCDABD
vector<int> getNext(string s) {
  vector<int> next;
  next[0] = -1;
  int j = 0;
  int k = -1;

  while( j < s.length() ) {
    if( k == -1 || s[j] == s[k] ) {
      ++j;
      ++k;
      next[j] = k;
    } else {
      k = next[k];
    }
  }
  return next;
}
