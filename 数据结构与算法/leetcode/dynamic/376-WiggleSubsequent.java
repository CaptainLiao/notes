class Solution {
  public int wiggleMaxLength(int[] nums) {
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

class Solution2 {
  public int wiggleMaxLength(int[] nums) {
    int len = nums.length;
    if (len <= 1) return len;

    int[] temp = new int[len-1];
    int tLen = 0;
    for (int i = 1; i < len; ++i) {
      if (nums[i-1] != nums[i]) temp[tlen++] = nums[i] - nums[i-1];
    }

    if (tLen <= 1) return 1;
    
    int count = 2;
    for (int j = 1; j < tLen; ++j) 
      if (temp[j] * temp[j-1] < 0) ++count;

    return count;
  }
}