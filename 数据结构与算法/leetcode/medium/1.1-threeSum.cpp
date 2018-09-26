/**
三数之和https://leetcode-cn.com/explore/interview/card/top-interview-questions-medium/29/array-and-strings/75/
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/

/**
	对原数组进行排序后开始遍历。
	当遇到大于 0 的数时即可结束，因为对于有序数组，当前值大于 0，那么永远不可能出现 0 和。
	对于遍历到当前数a，用 0 减去它得到一个target，再在a后面找到两个数的和等于target，具体过程为如下。
	我们用指针l、r分别指向a之后的数组的头、尾，如果它们指向的值的和：
	  1、等于 target，则将这三个数存入结果中；
	  2、小于 target，则左边的指针加 1，使得结果变大；
	  3、大于 target，则右边的指针r减 1，使结果变小；
*/
vector<vector<int>> threeSum(vector<int>& nums) {
	int len = nums.size();
	sort(nums.begin(), nums.end());
	
	vector<vector<int>> res;
	for (int i = 0; i < len; ++i) {
		if (nums[i] > 0) break;

		// 跳过重复项
		if (i > 0 && nums[i] == nums[i+1]) continue;

		int l = i + 1;
		int r = len - 1;
		int target = 0 - nums[i];

		while (l < r) {
			if (nums[l] + nums[r] == target) {
				res.push_back({nums[i], nums[l], nums[r]});
				// 跳过重复项
				while (l < r && nums[l] == nums[l+1]) ++l;
				while (l < r && nums[r] == nums[r-1]) --r;
				
				++i;
				--j;
			} else if(nums[l] + nums[r] < target) {
				++i;
			} else {
				--j;
			}
		}
	}

	return res;
}

