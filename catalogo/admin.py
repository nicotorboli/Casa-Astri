from django.contrib import admin
from .models import Producto, Categoria

# Registrar el modelo Producto
admin.site.register(Producto)

# Registrar el modelo Categoria
admin.site.register(Categoria)
# Register your models here.
