import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Navegacion } from './components/Navegacion';
import { Footer } from './components/Footer';
import { Inicio } from './components/Inicio';
import { Carta } from './components/Carta';
import { Reservar } from './components/Reservar';
import { Pedidos } from './components/Pedidos';
import { Login } from './components/Login';
import { Admin } from './components/Admin';

import { AuthProvider, useAuth } from './context/AuthContext';

const RutaAdmin = () => {

  const { user } = useAuth();

  // Si no hay usuario logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si no es admin
  if (user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Si es admin
  return <Admin />;
};

export const App = () => {
  return (
    <AuthProvider>
      <Router>

        <div className="app-layout">

          <Navegacion />

          <Routes>

            <Route path="/" element={<Inicio />} />

            <Route path="/carta" element={<Carta />} />

            <Route path="/reservar" element={<Reservar />} />

            <Route path="/pedidos" element={<Pedidos />} />

            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<RutaAdmin />} />

          </Routes>

          <Footer />

        </div>

      </Router>
    </AuthProvider>
  );
};

export default App;