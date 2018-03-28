def nums():
    x = {'a':4, 'b':2, 'c':7, 'd':9, 'e':1}
    min = None
    max = 0
    diff = 0
    lis = []
    lis2 = []
    for key,value in x:
        lis.append(key)
        lis2.append(value)
        # if value< min:
        #     min = value
    print(lis)
    print(lis2)
    return lis



nums()
