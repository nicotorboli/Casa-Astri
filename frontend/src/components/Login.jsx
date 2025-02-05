import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css"; // Asegúrate de importar el CSS

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/users/login/", { username, password });
      if (response.status === 200) {
        login(response.data.access);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.error : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Login"}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="register-link">
        No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;