#  *-* encoding = utf-8 *-*

# print(dir(str))
# print(dir(int))
# print(dir(list))
# print(dir(dict))
# print(dir(tuple))
# print(dir(set))
# str.find(str, beg=0, end=len(string))
stra = 'dsiafiwfbna'
strb = 'noahoefa'
# 增 删 改 查
print(stra + strb)

print(stra.replace('a',''))
print(stra.replace('a','X',1))
print(stra.replace('a','X',2))

print(stra.find('a'))
print(stra.find('a',5))
print(stra.rfind('a',5))
print(stra.find('a',15))

# 格式化输出
print ("我叫 %s 今年 %d 岁!" %('小明', 10))
print ("我叫 {0} 今年 {1} 岁!".format('小明', 10))
print ("我叫 {name} 今年 {age} 岁!".format(name="小明", age = 10))

strx = ['xiaozhao','xiaoli','xiaowang']
print(' ' .join(strx))
