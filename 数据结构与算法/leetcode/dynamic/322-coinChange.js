
 /**
 * 322 零钱挑战
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 
 * 用数组 dp 保存从 0-amount 过程中对应的硬币个数。
 * 1.先确认最后一步：组成 amount 的最后一个硬币假设为 coins[i]，选或者不选。
     如果选：f[amount] = f[amount-coins[i]] + 1
     不选：f[amount] = f[amount]
     则状态转移方程为 f[amount] = Math.min(f[amount - coins[i]] + 1, f[amount])
   2.注意边界 f[0] = 0
 */

var coinChange = function(coins, amount) {
  var len = coins.length

  if (!len || !amount) return 0

  var f = Array(amount+1).fill(Number.MAX_SAFE_INTEGER)
  f[0] = 0

  for(var i = 0; i <= amount; ++i) {
    for (var c of coins) {
      if (i >= c) f[i] = Math.min(f[i - c] + 1, f[i])
    }
  }

  return f[amount] === Number.MAX_SAFE_INTEGER ? -1 : f[amount]
}