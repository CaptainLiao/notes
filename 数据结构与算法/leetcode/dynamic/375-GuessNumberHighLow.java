public class Solution {
  private int[][]dp;

  private int solve(int l, int r) {
    if (l >= r) return 0;
    // 说明 dp[l][r] 已经被计算过了，直接返回
    if (dp[l][r] != Integer.MAX_VALUE) return dp[l][r];

    for (int i = l; i <= r; ++i) {
      dp[l][r] = Math.min(dp[l][r], Math.max(i + solve(l, i-1), i + solve(i+1, r)));
    }

    return dp[l][r];
  }

  public int getMoneyAmount(int n) {
    dp = new int[n+1][n+1];
    for (int[] row : dp)
      Arrays.fill(row, Integer.MAX_VALUE);

    return solve(1, n);
  }
}