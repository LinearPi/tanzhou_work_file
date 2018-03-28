# coding: utf-8
# 创建一个新的pdf 上面写文字水印
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm


def create_watermark(content):
    # 默认大小为21cm*29.7cm
    c = canvas.Canvas("make1.pdf", pagesize=(30 * cm, 30 * cm))
    # 移动坐标原点(坐标系左下为(0,0))
    c.translate(10 * cm, 5 * cm)

    # 设置字体
    c.setFont("Helvetica", 80)
    # 指定描边的颜色
    c.setStrokeColorRGB(0, 1, 0)
    # 指定填充颜色
    c.setFillColorRGB(0, 1, 0)
    # 画一个矩形
    c.rect(cm, cm, 7 * cm, 17 * cm, fill=1)

    # 旋转45度，坐标系被旋转
    c.rotate(45)
    # 指定填充颜色
    c.setFillColorRGB(0.6, 0, 0)
    # 设置透明度，1为不透明
    c.setFillAlpha(0.3)
    # 画几个文本，注意坐标系旋转的影响
    c.drawString(3 * cm, 0 * cm, content)
    c.setFillAlpha(0.6)
    c.drawString(6 * cm, 3 * cm, content)
    c.setFillAlpha(1)
    c.drawString(9 * cm, 6 * cm, content)
    c.showFullScreen0()
    # 关闭并保存pdf文件
    c.save()
create_watermark('make')