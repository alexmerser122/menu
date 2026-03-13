import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (usuario, contraseña) => {

    // ADMIN
    if (usuario === 'admin' && contraseña === 'sakura2026') {
      setUser({
        nombre: usuario,
        rol: "admin"
      });
      return true;
    }

    // CLIENTE
    if (usuario === 'cliente' && contraseña === 'sushi123') {
      setUser({
        nombre: usuario,
        rol: "cliente"
      });
      return true;
    }

    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};