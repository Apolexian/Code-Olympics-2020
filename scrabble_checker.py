def canMakeStr(s1, s2): 
    count = {s1[i] : 0 for i in range(len(s1))} 
    for i in range(len(s1)): 
        count[s1[i]] += 1
    for i in range(len(s2)): 
        if count[s2[i]] == 0: 
            return 0
        count[s2[i]] -= 1
    return 1

n = int(input())
for i in range(n):
    inputlst = input().strip().split()
    s1 = inputlst[0]
    s2 = inputlst[1]
    print(canMakeStr(s2, s1))