import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Importar Link
import "../styles/Auth.css"; // Asegúrate de importar el CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/users/register/", { username, password, email });
      if (response.status === 201) navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error desconocido");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      {/* Enlace al login */}
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
};

export default Register;