from rest_framework import serializers
from .models import Producto, Categoria,Carrito,ItemCarrito

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'categoria', 'precio', 'imagen_url', 'stock']
        
    def get_imagen_url(self, obj):
        request = self.context.get('request')
        if obj.imagen:
            return request.build_absolute_uri(obj.imagen.url)
        return None

class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()  # Usar ProductoSerializer en lugar de StringRelatedField

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad', 'precio_unitario']

class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(source='itemcarrito_set', many=True)

    class Meta:
        model = Carrito
        fields = ['user', 'session_key', 'items']