from PDFlib.PDFlib import PDFlib
from PDFlib.PDFlib import PDFlibException


# 给单个文件添加水印，在右上角和左下角各添加一个水印
# 所有参数均为全路径文件名
def add_watermark(pdf_file_in, pdf_file_out, image_file):
    p = PDFlib()
    p.set_option("license=xxxxx")  # your key
    p.set_option("errorpolicy=return");

    if (p.begin_document(pdf_file_out, "") == -1):
        raise PDFlibException("Error: " + p.get_errmsg())
    p.set_info("Author", "walker");
    p.set_info("Title", "");
    p.set_info("Creator", "walker");
    p.set_info("Subject", "");
    p.set_info("Keywords", "");
    # p.set_info("Producer", "walker");
    # 输入文件
    indoc = p.open_pdi_document(pdf_file_in, "");
    if (indoc == -1):
        raise PDFlibException("Error: " + p.get_errmsg())

    endpage = p.pcos_get_number(indoc, "length:pages");
    endpage = int(endpage)

    image = p.load_image("auto", image_file, "")
    if image == -1:
        raise PDFlibException("Error: " + p.get_errmsg())

    for pageno in range(1, endpage + 1):
        page = p.open_pdi_page(indoc, pageno, "");
        if (page == -1):
            raise PDFlibException("Error: " + p.get_errmsg())
        p.begin_page_ext(0, 0, "");  # 添加一页

        p.fit_pdi_page(page, 0, 0, "adjustpage")
        page_width = p.get_value("pagewidth", 0)  # 单位为像素72dpi下像素值
        page_height = p.get_value("pageheight", 0)  # 单位为像素72dpi下像素值

        imagewidth = p.info_image(image, "imagewidth", "");
        imageheight = p.info_image(image, "imageheight", "");

        margin = 1000  # 用于设置水印边距

        optlist_top = "boxsize={" + str(page_width) + " " + str(page_height) + "} "
        optlist_top += "position={" + str(margin / page_width) + " " + str(margin / page_height) + "} "
        optlist_top += " fitmethod=clip dpi=96"

        optlist_bottom = "boxsize={" + str(page_width) + " " + str(page_height) + "} "
        optlist_bottom += "position={" + str(100 - margin / page_width) + " " + str(100 - margin / page_height) + "} "
        optlist_bottom += " fitmethod=clip dpi=96"

        p.fit_image(image, 0, 0, optlist_bottom)
        p.fit_image(image, 0, 0, optlist_top)

        p.close_pdi_page(page);
        p.end_page_ext("");

    p.close_image(image)
    p.end_document("")