#-*- coding:utf-8 -*-


import PyPDF2

watermarkFile = open('123.pdf', 'rb')
pdfWatermarkReader = PyPDF2.PdfFileReader(watermarkFile)

minutesFile = open('2017.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(minutesFile)

if pdfReader.getIsEncrypted():
    print('该PDF文件被加密了.')

# # 尝试用空密码解密
# try:
#     pdfReader.decrypt('')
# except Exception as e:
#     print('尝试用空密码解密失败.')
#     print(False)
# else:
#     print('用空密码解密成功.')

pdfWriter = PyPDF2.PdfFileWriter()

for pageNum in range(pdfReader.numPages):
    pageObj = pdfReader.getPage(pageNum)
    pageObj.mergePage(pdfWatermarkReader.getPage(0))
    pdfWriter.addPage(pageObj)

resultPdfFile = open('watermarkedCover.pdf', 'wb')
pdfWriter.write(resultPdfFile)

watermarkFile.close()
minutesFile.close()
resultPdfFile.close()