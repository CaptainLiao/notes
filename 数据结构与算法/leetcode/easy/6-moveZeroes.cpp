/**
移动零
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

说明:
必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。
*/


class Solution {
  public:
    // 简单版：遍历数组，找到0，不停的交换当前0和后面的元素，直到末尾
    void moveZeros(vector<int>& nums) {
      if( nums.empty() ) return;
      int sz = nums.size();
      
      // 优化：每将一个 0 移动到数组尾，可将下次可交换的距离减1
      int n = 0;
      for( int i = 0; i < sz - n; ++i ) {
        if( nums[i] != 0 ) 
          continue;

        for( int j = i; j < sz - n -1; ++j ) {
          if( j == i && nums[i+1] == 0) --i;
          nums[j] = nums[j + 1];
          nums[j + 1] = 0;
        }
        ++n;
      }
    }
    
    // 升级版：将所有非零元素向前移动，在数组末尾添0
    void moveZeros2(vector<int>& nums) {
      if( nums.empty() ) return;
      int sz = nums.size();
      int j = 0; // 记录有多少个非零元素被移动了
      
      for( int i = 0; i < sz; ++i ) {
        if( nums[i] != 0 ) {
          nums[j] = nums[i];
          ++j;
        }
      }
      for( ; j < sz; ++j ) {
        nums[j] = 0;
      }
    }
}
