/**
 *
 字谜分组
给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

示例:

输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
说明：

所有输入均为小写字母。
不考虑答案输出的顺序。
 * */

vector<vector<string>> classify(vector<string> s) {
	map<int, vector<string>> tMap;
	for (int i = 0; i < s.size(); ++i) {
		int j = 0;
		int sum = 0; // 将字符转化为ascii码
		while ('\0' != s[i][j]) {
			sum += s[i][j++];
		}

		if (tMap.find(sum)) {
			tMap[sum].push_back({s[i]});
		} else {
			tMap.insert(pair<int, vector<string>>(sum, {s[i]}));
		}
	}

	map<int, vector<string>>::iterator iter;
	vector<vector<string>> res;
	for (iter = tMap.begin(); iter != tMap.end(); ++iter)
		res.push_back({iter->second});

	return res;
}






