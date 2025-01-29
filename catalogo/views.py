from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer


class ProductoPagination(PageNumberPagination):
    page_size = 4  # Puedes cambiar este valor según lo que necesites

 # Permite filtrar por nombre de producto y categoría
# Create your views here.
class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    pagination_class = ProductoPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]  # Agrega filtros y búsqueda
    filterset_fields = ['categoria']  # Permite filtrar por categoría
    search_fields = ['nombre']  # Permite búsqueda por nombre

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer