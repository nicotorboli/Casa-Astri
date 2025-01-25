from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer

class ProductoPagination(PageNumberPagination):
    page_size = 10  # Puedes cambiar este valor según lo que necesites

class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    pagination_class = ProductoPagination
    filter_backends = [SearchFilter]
    search_fields = ['nombre', 'categoria__nombre']  # Permite filtrar por nombre de producto y categoría
# Create your views here.

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer