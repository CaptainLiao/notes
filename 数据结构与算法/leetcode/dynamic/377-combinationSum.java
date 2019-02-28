class Solution {
  publick int combinationSum4_2(int[] nums, int target) {
    if (nums.length == 0) return 0;
    if (target == 0) return 1;

    int res = 0;
    for (int n : nums) {
      if (target >= n) res += combinationSum(nums, target - n);
    }
    return res;
  }
}

class Solution {
  private int[] memo;
  private int search(int[] nums, int target) {
    if (memo[target] != -1) return memo[target];

    int res = 0;
    for (int n : nums) {
      if (target >= n) res += search(nums, target - n);
    }

    memo[target] = res;
    return res;
  }
  publick int combinationSum4(int[] nums, int target) {
    if (nums.length == 0) return 0;
    if (target == 0) return 1;

    memo = new int[target+1];
    Arrays.fill(memo, -1);
    memo[0] = 1;

    return search(nums, target)
  }
}