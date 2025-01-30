import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/users/register/", {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        // Si el registro es exitoso, redirige al login
        navigate("/login");  
      }
    } catch (error) {
      // Aquí capturamos el error si el usuario ya está registrado
      if (error.response?.status === 400 && error.response?.data?.message === 'Usuario ya registrado') {
        setError("El usuario ya está registrado. Por favor, inicia sesión.");
      } else {
        setError("Error al registrar: " + (error.response?.data?.message || "Error desconocido"));
      }
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Register