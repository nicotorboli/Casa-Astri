from django.urls import path
from .views import ProductoListView, CategoriaListView

urlpatterns = [
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('categorias/', CategoriaListView.as_view(), name='categoria-list'),
]