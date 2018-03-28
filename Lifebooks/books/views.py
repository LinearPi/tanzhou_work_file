from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView
from books.models import Books

# class BooksList(ListView):
def index(request):

    books = Books.objects.all()

    return render(request, 'base.html', {
        'books': books,
    })

