# 11.25/20

maxint = 9000000000
n = int(input())
a = (input().strip()).split()
a = [int(x) for x in a]
a = [int(x) for x in a]

max_so_far = -maxint - 1
max_ending_here = 0
       
for i in range(0, n): 
    max_ending_here = max_ending_here + a[i] 
    if (max_so_far < max_ending_here): 
        max_so_far = max_ending_here 

    if max_ending_here < 0: 
        max_ending_here = 0   
print(max_so_far)