# encoding=utf-8
from PyPDF2 import PdfFileWriter, PdfFileReader
from reportlab.pdfgen import canvas
import os

def add_watermark(pdf_file, pdf_watermark, output_dir='output'): #, max_page=5
    """给指定PDF文件文件加上水印
    pdf_file - 要加水印的源PDF文件
    pdf_watermark - PDF水印模板
    max_page - 加水印的最大页数
    """
    pdf_output = PdfFileWriter()
    input_stream = open(pdf_file, 'rb')
    pdf_input = PdfFileReader(input_stream)

    # PDF文件被加密了
    if pdf_input.getIsEncrypted():
        print('该PDF文件被加密了.')

    # 尝试用空密码解密
    try:
        pdf_input.decrypt('')
    except Exception as e:
        print('尝试用空密码解密失败.')
        return False
    else:
        print('用空密码解密成功.')


        # 获取PDF文件的页数
    pageNum = pdf_input.getNumPages()
    # 给每一页打水印
    for i in range(pageNum):
        page = pdf_input.getPage(i)
        if i < max_page:
            # 只给前max_page页加水印
            page.mergePage(pdf_watermark.getPage(0))
        pdf_output.addPage(page)

        # 最后输出文件
    output_stream = open(os.path.join(output_dir, os.path.basename(pdf_file)), 'wb')
    pdf_output.write(output_stream)
    output_stream.close()
    input_stream.close()
    return True

if __name__ == '__main__':
    # 创建水印文件
    pdf_watermark = open()
    add_watermark('mark4.pdf', pdf_watermark)