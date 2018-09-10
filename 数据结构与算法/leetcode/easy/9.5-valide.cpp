

bool isValid(string s) {
  map<char, int> o;
  o['('] = 1;
  o[')'] = -1;
  o['['] = 2;
  o[']'] = -2;
  o['{'] = 3;
  o['}'] = -3;

  stack<int> st;
  
  for (int i = 0; i < s.size(); ++i) {
    int t = o[s[i]];
    if (t > 0)
      st.push(t);
    else {
      if (st.empty() || -t != st.top()) return false;
      st.pop();
    }
  }
  return st.empty();
}
