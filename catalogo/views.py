from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer
from rest_framework.response import Response;
from rest_framework.pagination import PageNumberPagination

class ProductoPagination(PageNumberPagination):
    page_size = 4  # Establece el número de elementos por página
    max_page_size = 100  # Limita el número máximo de elementos por página

 # Permite filtrar por nombre de producto y categoría
# Create your views here.


class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    pagination_class = ProductoPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['categoria']
    search_fields = ['nombre']

    def list(self, request, *args, **kwargs):
        # Obtén la respuesta paginada automáticamente
        response = super().list(request, *args, **kwargs)
        
        # Si necesitas añadir información adicional como el total de páginas
        response.data['total_pages'] = self.paginator.page.paginator.num_pages

        return response

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer