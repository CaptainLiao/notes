package com.java.algorithm.leetcode;

// 分析：使用动态规划三部曲
// 第一步：假设前 n-1 项结果已知
// 第二步：求第 n 项结果，分析得出递推公式
// 第三步：根据递推公式，从前往后逐个进行计算

/**
 * 第 i 天的最大收益 = max(第 i 天前的最大收益，第 i 天的价格 - 第 i 天前的最低价格)
 * 设第 i 天的最大收益为 F(i)，股票第 i 天的价格为 stock[i] 那么：
 * F(i) = max(F(i-1), stock[i] - min(stock[0...i-1]))
 * */
public class _121_DP_BestTimeToBuyAndSellStock {

  public int maxProfit(int[] prices) {
    int maxProfit = 0;
    int minPrice = Integer.MAX_VALUE;
    for (int price : prices) {
      minPrice = Math.min(price, minPrice);
      maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
  }
}
