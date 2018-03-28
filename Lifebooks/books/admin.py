from django.contrib import admin
from books.models import Books

# Register your models here.

class BooksAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'publisher', 'website', 'summary' , 'image', 'author_name', 'age', 'email']
    list_filter = ['name', 'title', 'publisher', 'website', 'summary' , 'image', 'author_name', 'age', 'email']
    search_fields = ['name', 'title', 'publisher', 'website', 'summary' , 'image', 'author_name', 'age', 'email']

    class Meta():
        verbose_name = u'书籍1'
        verbose_name_plural = verbose_name

    def __set__(self):
        return self.name


admin.site.register(Books, BooksAdmin)

