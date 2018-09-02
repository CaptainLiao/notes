vector<vector<int>> resetZero(vector<vector<int>> matrix, int m, int n) {
	vector<int> arr;

	for (int i = 0; i < m; ++i) {
		for (int j = 0; j < n; ++j) {
			if (matrix[i][j] == 0) {
				if (arr.find(j)) {
					continue;
				} else {
					arr.push_back(j);
					int k = 0;
					int p = 0;
					while (k < m) matrix[k++][j] = 0;
					while (p < n) matrix[i][p++] = 0;
					break;
				}
			}
		}
	}

	return matrix;

}

