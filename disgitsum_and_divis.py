# kinda works

import math

def smallestNumber(N):
    if N % 9 == 0: 
        mod = 0
    else:
        mod = 1
    min_dig = N // 9 + mod
    
    
    i = max(N, (min_dig - 1) * 10)
    while(True):
        sum_dig_i = sum(int(digit) for digit in str(i))
        if sum_dig_i == N:
            return i
        i += N

n = int(input())
print(smallestNumber(n))