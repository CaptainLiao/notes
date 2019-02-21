class Solution {
  public int WiggleMaxLength(int[] nums) {
    int len = nums.length;
    if (len < 2) return len;

    int up = 1;
    int down = 1;
    for (int i = 1; i < len; ++i) {
      if (nums[i] > nums[i-1]) up = down + 1;
      if (nums[i] < nums[i-1]) down = up + 1;
    }

    return Math.max(up, down);
  }
}