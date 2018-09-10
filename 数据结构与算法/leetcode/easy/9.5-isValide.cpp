bool isValide(string s) {
	map<char, int> m;
	m['('] = 1;
	m[')'] = -1;
	m['{'] = 2;
	m['}'] = -2;
	m['['] = 3;
	m[']'] = -3;

	stack<int> st;

	int sz = s.size();
	for (int i = 0; i < sz; ++i) {
		char c = sz[i];
		if (m[c] > 0)
			st.push(m[c]);
		else {
			if (st.empty() || m[c] != st.top()) return false;
			st.pop();
		}
	}
	return st.empty();
}


