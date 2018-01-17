
# from string import maketrans
intab = 'aeiou'
outtab = '12345'
stra = "this is string example……wow!!!"
trantab = stra.maketrans(intab,outtab)

print(stra.translate(trantab))
print(stra.translate(trantab))
