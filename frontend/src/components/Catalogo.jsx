import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Filtros from './Filtros';
import Paginacion from './Paginacion';
import ProductoCard from './ProductoCard';
import '../styles/Catalogo.css';

const Catalogo = () => {
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Cargando productos...');

  // Fetch de productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setMessage('Cargando productos...');
        const params = {};

        // Filtrar por página
        if (pagina) params.page = pagina;

        // Filtrar por categoría si está seleccionada
        if (categoriaSeleccionada) params.categoria = categoriaSeleccionada;

        // Filtrar por nombre de producto si se ha ingresado
        if (nombreProducto) params.search = nombreProducto.toLowerCase(); // Cambiado de nombre a search

        const response = await Axios.get("http://localhost:8000/api/catalogo/productos/", { params });
        setProductos(response.data.results);
        setTotalPaginas(response.data.total_pages || 1);
        setMessage(response.data.results.length === 0 ? 'No hay productos que coincidan con los filtros.' : '');
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setMessage('Hubo un error al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [pagina, categoriaSeleccionada, nombreProducto]);

  // Fetch de categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/catalogo/categorias/');
        setCategorias(response.data || []); // Manejo de datos vacíos
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

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
          <p>{message}</p>
        ) : productos.length > 0 ? (
          productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p>{message}</p>
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