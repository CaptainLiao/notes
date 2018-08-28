/**
Shuffle an Array:https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/24/design/58/
打乱一个没有重复元素的数组。

示例:

// 以数字集合 1, 2 和 3 初始化数组。
int[] nums = {1,2,3};
Solution solution = new Solution(nums);

// 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
solution.shuffle();

// 重设数组到它的初始状态[1,2,3]。
solution.reset();

// 随机返回数组[1,2,3]打乱后的结果。
solution.shuffle();
*/

// 延伸阅读：
//**[洗牌的正确姿势-Knuth shuffle算法](https://yjk94.wordpress.com/2017/03/17/%E6%B4%97%E7%89%8C%E7%9A%84%E6%AD%A3%E7%A1%AE%E5%A7%BF%E5%8A%BF-knuth-shuffle%E7%AE%97%E6%B3%95/)**

class Solution {
  private:
    vector<int> nums;
    vector<int> shuffles;
    int length;

  public:
    void Solution(vector<int> nums) {
      this->nums = nums;
    }

    vector<int> reset () {
      return this->nums;
    }

    vector<int> shuffle () {
      for (int i = 0; i < this.length; ++i) {
        int t = i + rand() % (this.lenght - i);
        swap(this->shuffles[i], this->shuffles[t]);
      }

      return this->shuffles;
    }
}


