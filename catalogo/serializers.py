from rest_framework import serializers
from .models import Producto, Categoria,Carrito,ItemCarrito

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'categoria', 'precio']


class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = serializers.StringRelatedField()

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad', 'precio_unitario']

class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(source='itemcarrito_set', many=True)

    class Meta:
        model = Carrito
        fields = ['user', 'session_key', 'items']