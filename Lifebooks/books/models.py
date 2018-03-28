from django.db import models
from datetime import datetime
# Create your models here.

class Books(models.Model):
    name = models.CharField(max_length=30, verbose_name=u'书名')
    title = models.CharField(max_length=100, verbose_name=u'标题')
    author_name = models.CharField(max_length=200, verbose_name=u'作者名', default=u'x')
    age = models.IntegerField(default=24, verbose_name=u'年龄', null=True, blank=True)
    email = models.EmailField(verbose_name=u'邮箱', null=True, blank=True)
    publisher = models.CharField(max_length=100, verbose_name=u'出版社')
    publication_date = models.DateField( verbose_name=u'出版时间')
    website = models.URLField( verbose_name=u'网站', null=True, blank=True)
    summary = models.CharField(max_length=300, verbose_name=u'简介')
    image = models.ImageField(upload_to='media', verbose_name=u'图片', null=True, blank=True)

    class Meta:
        verbose_name = u'书籍'
        verbose_name_plural = verbose_name


    def __str__(self):
        return self.name

