# *-*  coding=utf-8  *-*
def one():
    print(2**38)


def two():

    str = "g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. " \
          "bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. " \
          "sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj."
    old = "abcdefghijklmnopqrstuvwxyz"
    new = "cdefghijklmnopqrstuvwxyzab"
    strurl = "map"
    trans = str.maketrans(old, new)
    print(str.translate(trans))
    transurl = strurl.maketrans(old, new)
    print(strurl.translate(transurl))

# def three():
#     import urllib
#     from urllib import request
#     import re
#
#     response = request.urlopen("http://www.pythonchallenge.com/pc/def/ocr.html")
#     page = response.read()
#     page = page.decode('utf-8')
#     print(page)
#     # page = re.match('<!--(.*?)-->',page)
#     print(type(page))
#     text = {}
#     text =re.findall("[a-z]",page)
#     print(type(text))
#     print(text)


def threeTwo():
    from urllib import request

    def get_challenge(s):
        return request.urlopen('http://www.pythonchallenge.com/pc/' + s).read().decode('utf-8')

    src = get_challenge('def/ocr.html')
    import re
    text = re.compile('<!--((?:[^-]+|-[^-]|--[^>])*)-->', re.S).findall(src)[-1]
    counts = {}
    for c in text:
        counts[c] = counts.get(c, 0) + 1
    print(counts)
    print(''.join(re.findall('[a-z]', text)))


def four():
    from urllib import request

    def get_challenge(s):
        return request.urlopen('http://www.pythonchallenge.com/pc/' + s).read().decode('utf-8')

    src = get_challenge('def/equality.html')
    import re
    text = re.compile('<!--((?:[^-]+|-[^-]|--[^>])*)-->', re.S).findall(src)[-1]
    counts = {}
    for c in text:
        counts[c] = counts.get(c, 0) + 1
    print(counts)
    print(''.join(re.findall('[^A-Z][A-Z]{3}([a-z])[A-Z]{3}[^A-Z]', text)))


def five():
    from urllib import request
    import re


    def next_page(p):
        text = request.urlopen('http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=%s' % p).read().decode(
            'utf-8')
        m = re.match('.*?and the next nothing is ([0-9]+)', text)
        if not m:
            print(text)
        print(m.group(1))
        p = m.group(1)
        return p

    p = 21545
    # p = int(p) // 2  16044//2 = 8022
    next_page(p)

    for i in range(400):
        p = next_page(p)


def six():
    import pickle

    # 打开文件
    pk_file = open("banner.p", "rb")

    # 将文件反序列化成对象
    data = pickle.load(pk_file)

    str = ""

    for list in data:
        print(list)
        for i in list:
            str += i[0] * i[1]
        str += '\n'
    print(str)

def seven():
   pass

if __name__ == '__main__':
    two()