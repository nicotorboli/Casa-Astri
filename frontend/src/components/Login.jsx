import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);  // Para mostrar un estado de carga
  const navigate = useNavigate();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Activa el estado de carga

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        // Almacenamos el token en el localStorage (si lo estás usando)
                // Usa la función login del contexto para almacenar el token
        login(response.data.access);


        // Redirige a la página de Home
        navigate("/");
      }
    } catch (error) {
      // Si hay un error, mostramos un mensaje adecuado
      setErrorMessage(error.response ? error.response.data.error : "Error desconocido");
    } finally {
      setLoading(false);  // Desactiva el estado de carga
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Login"}
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
{/*
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8000/api/login', { email, password });
      console.log('Usuario autenticado:', response.data);
    } catch (error) {
      setError('Credenciales incorrectas');
      console.error('Error en login:', error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" style={{ padding: '8px', margin: '10px' }} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" style={{ padding: '8px', margin: '10px' }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

*/}