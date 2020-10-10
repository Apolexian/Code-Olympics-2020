# score: 20
import math

inputs = input().strip().split()
k = int(inputs[0])
n = int(inputs[1])

if k < 0 or n < 0:
    print(0)

def prevPowerofK(n, k):
    p = int(math.log(n) / math.log(k))
    return int(math.pow(k, p))

print(prevPowerofK(n, k))