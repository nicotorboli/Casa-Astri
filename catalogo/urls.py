from django.urls import path
from .views import ProductoListView,CategoriaListView,CarritoView, AddToCarritoView, RemoveFromCarritoView,ProcesarPagoView,RemoveOneFromCarritoView

urlpatterns = [
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('categorias/', CategoriaListView.as_view(), name='categoria-list'),
    path('carrito/', CarritoView.as_view(), name='ver_carrito'),
    path('carrito/add/', AddToCarritoView.as_view(), name='agregar_carrito'),
    path('carrito/remove/<int:item_id>/', RemoveFromCarritoView.as_view(), name='eliminar_carrito'),
    path('carrito/remove_one/<int:item_id>/', RemoveOneFromCarritoView.as_view(), name='eliminar_uno_carrito'),
    path('carrito/pagar/', ProcesarPagoView.as_view(), name='procesar_pago'),
]