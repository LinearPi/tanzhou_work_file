# coding: utf-8
# pdf_watermark.py

import os
# http://pybrary.net/pyPdf/
from PyPDF2 import PdfFileWriter, PdfFileReader

def add_watermark(pdf_file, pdf_watermark, output_dir='D:\code\git_respository\git_respository\lession', max_page=5):
    """给指定PDF文件文件加上水印
    pdf_file - 要加水印的源PDF文件
    pdf_watermark - PDF水印模板
    max_page - 加水印的最大页数
    """
    # 读取写的模块
    # 文件写出
    pdf_output = PdfFileWriter()
    # 写入一个文件
    input_stream = open(pdf_file, 'rb')
    pdf_input = PdfFileReader(input_stream)
    # 给每一页打水印
    pageNum = pdf_input.getNumPages()
    for i in range(pageNum):
        page = pdf_input.getPage(i)
        if i < max_page:
            # 只给前max_page页加水印
            page.mergePage(pdf_watermark.getPage(0))
        pdf_output.addPage(page)

    # 最后输出文件

    output_stream = open(os.path.join(output_dir, os.path.basename('ttt.pdf')), 'wb')
    pdf_output.write(output_stream)
    output_stream.close()
    input_stream.close()
    return True

if __name__ == '__main__':
    pk = PdfFileReader(open('35.pdf', 'rb'))
    add_watermark('123.pdf', pk)
