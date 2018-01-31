var = 99

def local():
	var = 0

def glob1():
	global var
	var += 1

def glob2():
	var = 0
	import thismod
	thismod.var += 1

def glob3():
	var = 0
	import sys
	glob = sys.modules['thismod']
	glob.var += 1

def test():

	print(var)
	print('*'*40)
	local()
	print(var)
	print('*'*40)

	glob1()
	print(var)
	print('*'*40)

	glob2()
	print(var)
	print('*'*40)

	glob3()
	print(var)

