def intersect(seq1, seq2):
	res = []
	for x in seq1:
		if x in seq2:
			res.append(x)
	print(res)
	return res


s1 = "1234234"
s2 = "234567"

intersect(s1, s2)


def intersect2(s1,s2):
	return [x for x in s1 if x in s2]


s1 = "1234234"
s2 = "234567"

s3 = intersect2(s1, s2)
print(s3)