class Solution {
  // 摩尔投票法
  public int majorityElement4(int[] nums) {
    int count = 1;
    int curNum = nums[0];
    for (int i = 1; i < nums.length; ++i) {
      if (curNum == nums[i]) {
        ++count;
      } else {
        --count;
        if (count == 0) curNum = nums[i];
      }
    }
    return curNum;
  }

  public int majorityElement3(int[] nums) {
    Arrays.sort(nums);
    return nums[nums.length() / 2];
  }

  public int majorityElement2(int[] nums) {
      if (nums.length == 1) return nums[0];
      int x = nums.length / 2;
      Arrays.sort(nums);
      
      int temp = 1;
      for(int i = 1; i < nums.length; ++i) {
          temp = nums[i] == nums[i-1] ? ++temp : 1;
          if (temp > x) return nums[i];
      }
      return 0;
  }

      
  public int majorityElement(int[] nums) {
      int x = nums.length / 2;
      Map<Integer, Integer> hm = new HashMap<>();
      
      for(int num : nums) {
          int v = hm.get(num) == null ? 1 : hm.get(num) + 1;
          hm.put(num, v);
      }
      
      for(Map.Entry<Integer, Integer> entry : hm.entrySet()) {
          if(entry.getValue() > x) {
              return entry.getKey();
          }
      }
      
      return 0;
  }
}