int roma(string s) {
	map<char, int> roma = {
		{'I': 1},
		{'V': 5},
		{'X': 10},
		{'L': 50},
		{'C': 100},
		{'D': 500},
		{'M': 1000}
	};

	int res = 0;
	int preValue = s[0];
	int curValue = preValue;
	int i = 1; 

	res += curValue;

	while ('\0' != s[i]) {
		curValue = roma[s[i++]];
		if (preValue < curValue) {
			res += curValue;
			res -= preValue;
		} else {
			res += curValue;
		}

		preValue = curValue;
	}

	return res;
}
