import random
offices = [[],[],[]]
teachers = ['a','b','c','d','e','f','g','h']

for name in teachers:
    index = random.randint(0, 2)
    offices[index].append(name)

# for room in offices:
    # print(room)

