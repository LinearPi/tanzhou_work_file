import os
import sys
from PyPDF2 import PdfFileReader
from PyPDF2.pdf import PageObject
from PyPDF2 import PdfFileMerger

def pdf_path():
    inputPdf = PdfFileReader(open('test.pdf', 'rb'))
    docInfo = inputPdf.getDocumentInfo()
    print(docInfo.author)
    print(docInfo.creator)
    print(docInfo.producer)
    print(docInfo.title)
    print(docInfo.subject)

def water_path():
    path = 'D:/code/git_respository/git_respository/lession/'
    pdf_files = ['watermark.pdf', 'make.pdf']
    merger = PdfFileMerger()
    for files in pdf_files:
        merger.append(path+files)
    if not os.path.exists(path+'merger.pdf'):
        merger.write(path+'merger.pdf')
    merger.close()

def doc_type():
    pass

def water_make():
    # file = PdfFileReader(open('test.pdf', 'rb'))
    file = PdfFileMerger()
    mm = file.merge(1,'OneDrive.pdf')
    print(mm)


if __name__ == '__main__':
    water_make()
