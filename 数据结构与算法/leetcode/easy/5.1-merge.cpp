/**
 合并两个有序数组
给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。

说明:
初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例:
输入:
nums1 = [7,7,8,0,0,0], m = 3
nums2 = [2,5,9],       n = 3
输出: [1,2,2,3,5,6]
*/

// 从后往前插入
void merge(vector<int> &nums1, int m, vector<int> nums2, int n) {
  if (n == 0) return;

  int i = m - 1;
  int j = n - 1;
  int index = m + n - 1;

  while (i >=0 && j >= 0) {
    nums1[index--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }

  while (j >=0 ) {
    nums1[index--] = nums2[j--];
  }
}


void partition(vector<int>& nums, int left, int right) {
  if (left > right) return;

  int i = left;
  int j = right;
  int temp = arr[i];

  while (i < j) {
    while (i < j && nums[j] > temp) --j;
    if (i < j) {
      a[j] = a[i];
      ++i;
    }

    while (i < j && nums[i] < temp) ++i;
    if (i < j) {
      a[i] = a[j];
      --j;
    }
  }
  a[i] = temp;

  partition(nums, left, i-1);
  partition(nums, i+1, right);
}

void merge(vector<int> &nums1, int m, vector<int> nums2, int n) {
  if (n == 0) return;

  int i = 0;
  while (i++ < n-1) {
    nums1[m+i] = nums2[i];
  }

  return partition(nums1, 0, m + n -1)
}
