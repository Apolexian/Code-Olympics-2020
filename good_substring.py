s = str(input().strip())

last = -1
cnt = 0
for i in range(len(s)):
    if s[i] == "1":
        last = i
    cnt += last + 1

print(cnt)