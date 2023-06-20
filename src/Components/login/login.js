import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../login/login.css";
import Navegacion from '../Navegacion/Navegacion';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToCrud, setRedirectToCrud] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para llamar a la API externa y realizar la autenticación
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Autenticación exitosa, establecer la redirección a true
        console.log("Autenticación exitosa");
        setRedirectToCrud(true);
      } else {
        // Manejo de errores en caso de fallo de autenticación
        console.log("Error de autenticación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirectToCrud) {
    return <Navigate to="/Crud" />;
  }

  return (
    <div>
      <Navegacion />
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

