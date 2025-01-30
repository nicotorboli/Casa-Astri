from django.urls import path
from .views import ProductoListView, CategoriaListView,CarritoView, AddToCarritoView, RemoveFromCarritoView

urlpatterns = [
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('categorias/', CategoriaListView.as_view(), name='categoria-list'),
    path('carrito/', CarritoView.as_view(), name='ver_carrito'),
    path('carrito/add/', AddToCarritoView.as_view(), name='agregar_carrito'),
    path('carrito/remove/<int:item_id>/', RemoveFromCarritoView.as_view(), name='eliminar_carrito'),
]