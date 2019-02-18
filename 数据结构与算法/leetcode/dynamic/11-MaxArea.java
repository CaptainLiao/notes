public class MaxArea {
  public int geMaxArea(int[] height) {
    int len = height.length;
    if (len == 0) return 0;
    if (len == 1) return height[1];

    int max = 0;
    for (int i = 0; i < len; ++i) {
      max = Math.max(max, Math.max(getLeftMaxArea(height, i, 0), getRightMaxArea(height, i, len-1)));
    }
    return max;
  }

  private int getLeftMaxArea(int[] height, int start, int end) {
    if (end >= start) return 0;
    int max = 0;
    int count = 0;
    for (int i = start - 1; i >=0 && i >= end; --i) {
      ++count;
      max = Math.max(max, Math.min(height[start], height[i]) * count);
    }
    return count;
  }
  private int getRightMaxArea(int[] height, int start, int end) {
    if (start >= end) return 0;
    int max = 0;
    int count = 0;
    for (int i = start+1; i <= end; ++i) {
      ++count;
      max = Math.max(max, Math.min(height[start], height[i]) * count);
    }
    return count;
  }
}