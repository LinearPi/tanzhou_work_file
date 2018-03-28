import PyPDF2

watermarkFile = open('123.pdf', 'rb')
pdfWatermarkReader = PyPDF2.PdfFileReader(watermarkFile)

minutesFile = open('meetingminutes.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(minutesFile)

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