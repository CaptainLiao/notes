/**
  杨辉三角形：https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/26/others/67/
*/

vector<vector<int>> generate(int numRows) {

  vector<vector<int>> res(numRows);
  for (int i = 0; i < numRows; ++i) {
    // 杨辉三角，当前行的个数比上一行多 1个
    // 给第i行分配空间并初始化值为1
    res[i].resize(i+1, 1);
    for (int j = 1; j < i; ++j) {
      res[i][j] = res[i-1][j-1] + res[i-1][j];
    }
  }
  return res;
}
