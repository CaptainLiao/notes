### 375. 猜数字大小 II
原题链接[375. 猜数字大小 II](https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/)

题目下方给出了几个提示：
  * 游戏的最佳策略是减少最大损失，这引出了 Minimax 算法，见[这里](https://en.wikipedia.org/wiki/Minimax)，和[这里](https://univasity.iteye.com/blog/1170216)
  * 使用较小的数开始（例如3），看看在最差的情况下你要支付多少钱？
  * 即使 n 比较小，完全使用递归的效率也很低，试试动态规划吧。

我们就按照上面的提示玩一把：猜数字大小 II。

当 n = 3，那么我们有 3 个选择：1 或 2 或 3。

假设我们先猜 1，就有两种情况：
* [猜对]：1 就是正确的数字，所以你支付 0¥，或者
* [猜错]：1 不是正确数字，于是你需要支付 1¥（现在，你知道那个正确的数字 > 1，因为每次猜完后你都将被告知猜大了还是猜小了。但就目前的情况来看正确的那个数肯定比 1 大），于是我们得到了一个子问题（2，3）——在[2,3]范围内猜出正确的数字。运用递归，我们可以使用同样的方法解决这个问题，此时你可以选择 2 或 3。如果选择 2，你又有两个可能的结果：2 是正确的数字于是你支付 0¥，或者 2 不是正确的数字那么你支付 2¥ ，现在你知道正确的数字是 3 了（因为只剩下 3 这个数字）。如果选择 3，要么 3 就是正解要么你支付 3¥ 于是你知道 2 才是正确的答案。总结一下，选择 2 最多支付 2¥，选择 3 最多支付 3¥。两相比较，在支付最多的情况下，我们选择那个最小的值（2¥），即数字 2 作为子问题（2，3）的答案。（注意到 minimax 了么~~）所以，最终的花费是 1¥ + 2¥ = 3¥

如果你最先猜的是 2，同样会有两个可能的结果：
* 2 是正确的数字，你支付 0¥
* 2 不是正确的数字，你支付 2¥。此时，你会知道你猜大还是猜小了，于是你马上就知道哪个才是正确答案了。所以，如果你最先猜 2，你最多支付 2¥。

同样的，如果你最先猜 3，那么你最多需要花费 4¥。

所以，最先猜 2 才是最优选择，你最多花费 2¥。

参考下面的代码，你会看到这是一个十分自然的递归过程。（使用了二维矩阵缓存结果）
````java
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
````

原文链接：https://harunscorner.wordpress.com/2016/09/04/leetcode-guess-number-higher-or-lower-ii-solution/

参考：http://www.cnblogs.com/grandyang/p/5677550.html
