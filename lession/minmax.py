def minmax(test, *args):
	res = args[0]
	for arg in args[1:]:
		if test(arg, res):
			res = arg
	return res


def lessthan(x, y): return x < y
def grtrthan(x, y): return x > y

print(minmax(lessthan, 4, 2, 3, 1, 6 ,5))
print(minmax(grtrthan, 4, 2, 3, 1, 6 ,5))
def func(a, b, c=2, d=4):
	print(a,b,c,d)
func(1, *(5,6))