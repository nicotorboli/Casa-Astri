from rest_framework import generics, filters, status
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Producto, Categoria, Carrito, ItemCarrito
from .serializers import ProductoSerializer, CategoriaSerializer,CarritoSerializer
from rest_framework.response import Response;
from rest_framework.pagination import PageNumberPagination
from .serializers import CarritoSerializer, ItemCarritoSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


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



class CarritoView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            carrito, created = Carrito.objects.get_or_create(user=request.user)
        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.save()
                session_key = request.session.session_key
            carrito, created = Carrito.objects.get_or_create(session_key=session_key, user=None)
        
        serializer = CarritoSerializer(carrito)
        return Response(serializer.data)

class AddToCarritoView(APIView):
    def post(self, request):
        producto_id = request.data.get('producto_id')
        cantidad = request.data.get('cantidad', 1)

        try:
            producto = Producto.objects.get(id=producto_id)
            if request.user.is_authenticated:
                carrito, created = Carrito.objects.get_or_create(user=request.user)
            else:
                session_key = request.session.session_key
                if not session_key:
                    request.session.save()
                    session_key = request.session.session_key
                carrito, created = Carrito.objects.get_or_create(session_key=session_key, user=None)

            item, created = ItemCarrito.objects.get_or_create(
                carrito=carrito,
                producto=producto,
                defaults={"cantidad": cantidad, "precio_unitario": producto.precio}
            )

            if not created:
                item.cantidad += cantidad
                item.save()

            return Response({"message": "Producto añadido al carrito"}, status=status.HTTP_200_OK)

        except Producto.DoesNotExist:
            return Response({"message": "Producto no encontrado."}, status=status.HTTP_404_NOT_FOUND)


class RemoveFromCarritoView(APIView):
    def delete(self, request, item_id):
        try:
            if request.user.is_authenticated:
                item = ItemCarrito.objects.get(id=item_id, carrito__user=request.user)
            else:
                session_key = request.session.session_key
                if not session_key:
                    return Response({"message": "Sesión no válida."}, status=status.HTTP_400_BAD_REQUEST)
                item = ItemCarrito.objects.get(id=item_id, carrito__session_key=session_key)
            item.delete()
            return Response({"message": "Producto eliminado del carrito"}, status=status.HTTP_200_OK)
        except ItemCarrito.DoesNotExist:
            return Response({"message": "El producto no se encuentra en tu carrito."}, status=status.HTTP_404_NOT_FOUND)
        
class RemoveOneFromCarritoView(APIView):
    def post(self, request, item_id):
        try:
            if request.user.is_authenticated:
                item = ItemCarrito.objects.get(id=item_id, carrito__user=request.user)
            else:
                session_key = request.session.session_key
                if not session_key:
                    return Response({"message": "Sesión no válida."}, status=status.HTTP_400_BAD_REQUEST)
                item = ItemCarrito.objects.get(id=item_id, carrito__session_key=session_key)

            if item.cantidad > 1:
                item.cantidad -= 1
                item.save()
            else:
                item.delete()

            return Response({"message": "Se eliminó una unidad del producto"}, status=status.HTTP_200_OK)

        except ItemCarrito.DoesNotExist:
            return Response({"message": "El producto no se encuentra en tu carrito."}, status=status.HTTP_404_NOT_FOUND)
        
class ProcesarPagoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            carrito = Carrito.objects.get(user=request.user)
            # Aquí iría la lógica para procesar el pago
            # Por ahora, simplemente vaciamos el carrito
            carrito.productos.clear()
            return Response({"message": "Pago procesado exitosamente"}, status=status.HTTP_200_OK)
        except Carrito.DoesNotExist:
            return Response({"message": "No tienes un carrito activo."}, status=status.HTTP_404_NOT_FOUND)