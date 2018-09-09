int miteryNumber(vector<int> nums) {
	int maxV = 0;
	int res = 0;
	bool hasZero = false;

	int sz = nums.size();	

	int i = 0;
	int j = sz-1;
	while (i <= j) {
		int ni = nums[i];
		int nj = nums[j];
		res = res + ni + nj;
		maxV = max(maxV, max(ni,nj));
		hasZero = ni == 0 || nj == 0;

		if (i == j) res -= ni;
	}

	int temp = maxV * (maxV + 1) / 2;
	
	return temp == res
		? hasZero ? sz : 0
		: temp - res;
}


