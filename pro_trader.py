# score: 20
def maxProfit(k, prices):
        n = len(prices)
        if n < 2: 
            return 0
        dp = [[0 for _ in range(k+1)] for _ in range(n)]
        for k1 in range(1, k+1):
            for i in range(1, n):
                dp[i][k1] = dp[i-1][k1]
                for j in range(i):
                    tmp = prices[i] - prices[j]
                    tmp += dp[j][k1-1] if j > 0 and k1 - 1 > 0 else 0
                    dp[i][k1] = max(dp[i][k1], tmp)
        return dp[n-1][k]

n = int(input())
arr = input().strip().split()
arr = [int(x) for x in arr]
print(maxProfit(n, arr))