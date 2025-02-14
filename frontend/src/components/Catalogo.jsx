import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Filtros from './Filtros';
import Paginacion from './Paginacion';
import ProductoCard from './ProductoCard';
import '../styles/Catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]); // Todos los productos
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [pagina, setPagina] = useState(1); // Página actual
  const [loading, setLoading] = useState(true);
  const productosPorPagina = 4; // Número de productos por página

  // Fetch de todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("http://localhost:8000/api/catalogo/productos/");
        setProductos(response.data); // Guarda todos los productos
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Fetch de categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/catalogo/categorias/');
        setCategorias(response.data || []);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = async (productoId) => {
    try {
      const response = await Axios.post(
        'http://localhost:8000/api/catalogo/carrito/add/',
        { producto_id: productoId, cantidad: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert('Producto agregado al carrito');
        // No actualizamos el stock en el frontend
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Mostrar mensaje de error si no hay suficiente stock
      } else {
        console.error('Error al agregar al carrito:', error);
      }
    }
  };

  // Filtrar productos por categoría y nombre
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoriaSeleccionada ? producto.categoria.id == categoriaSeleccionada : true;
    const coincideNombre = nombreProducto ? producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase()) : true;
    return coincideCategoria && coincideNombre;
  });

  // Calcular productos para la página actual
  const indiceInicial = (pagina - 1) * productosPorPagina;
  const indiceFinal = indiceInicial + productosPorPagina;
  const productosPaginaActual = productosFiltrados.slice(indiceInicial, indiceFinal);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <div className="catalogo-container">
      {/* Filtros */}
      <Filtros
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        nombreProducto={nombreProducto}
        setNombreProducto={setNombreProducto}
      />

      {/* Productos */}
      <div className="catalogo-productos">
        {loading ? (
          <p>Cargando productos...</p>
        ) : productosPaginaActual.length > 0 ? (
          productosPaginaActual.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))
        ) : (
          <p>No hay productos que coincidan con los filtros.</p>
        )}
      </div>

      {/* Paginación */}
      <Paginacion
        pagina={pagina}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
      />
    </div>
  );
};

export default Catalogo;