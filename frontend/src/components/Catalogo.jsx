import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1); // Estado para la página actual
  const [loading, setLoading] = useState(true); // Estado de carga
  const [message, setMessage] = useState("Cargando productos...");
  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(`http://localhost:8000/api/productos/?page=${pagina}`);
        setProductos(response.data.results); // Guardamos los productos de la página actual
        setMessage(response.data.results.length === 0 ? "No hay productos por el momento." : ""); // Si no hay productos, mostramos el mensaje
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setMessage("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [pagina]); // Cada vez que cambia la página, vuelve a hacer la petición
  
  // Función para cambiar de página
  const cambiarPagina = (paginaNueva) => {
    setPagina(paginaNueva);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: '50px' }}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {message && <p>{message}</p>} {/* Mostrar mensaje si no hay productos */}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {productos.map((producto) => (
              <div key={producto.id} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h3>{producto.nombre}</h3>
                <p>Categoría: {producto.categoria.nombre}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => cambiarPagina(pagina - 1)} disabled={pagina === 1} style={{ margin: '0 10px' }}>
              Anterior
            </button>
            <span>Página {pagina}</span>
            <button onClick={() => cambiarPagina(pagina + 1)} style={{ margin: '0 10px' }}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Catalogo;