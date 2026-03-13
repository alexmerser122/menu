import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/login.css";

export const Login = () => {

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const ok = login(usuario, contraseña);

    if (ok) {

      // Si es admin va al panel
      if (usuario === "admin") {
        navigate('/admin', { replace: true });
      }

      // Si es cliente va al inicio
      else {
        navigate('/', { replace: true });
      }

    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <main className="login">

      <div className="login__wrap">

        <div className="login-card">

          {/* HEADER */}
          <div className="login-card__header">

            <div className="login-card__logo">
              <img
                src="/img/logo.png"
                alt="Sakura Sushi House"
                className="login-card__logo-img"
              />
            </div>

            <div className="login-card__brand">
              <div className="login-card__brand-name">
                Sakura
              </div>

              <div className="login-card__brand-tagline">
                Sushi House
              </div>
            </div>

          </div>

          {/* FORMULARIO */}
          <form className="login-card__form" onSubmit={handleSubmit}>

            <div className="login-card__field">

              <label htmlFor="usuario" className="login-card__label">
                Usuario
              </label>

              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="admin"
                className="login-card__input"
              />

            </div>

            <div className="login-card__field">

              <label htmlFor="contraseña" className="login-card__label">
                Contraseña
              </label>

              <input
                id="contraseña"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="••••••••"
                className="login-card__input"
              />

            </div>

            <button
              type="submit"
              className="login-card__submit"
            >
              Iniciar Sesión
            </button>

            {error && (
              <p className="login-card__error">
                {error}
              </p>
            )}

            <div className="login-card__links">

              <button
                type="button"
                className="login-card__link"
              >
                ¿Olvidaste tu contraseña?
              </button>

              <button
                type="button"
                className="login-card__link"
              >
                Registrarse
              </button>

            </div>

          </form>

          {/* CREDENCIALES */}
          <div className="login-card__demo">

            <div className="login-card__demo-inner">

              <p className="login-card__demo-title">
                Credenciales de prueba:
              </p>

              <p className="login-card__demo-text">
                Admin → admin|sakura2026
              </p>

              <p className="login-card__demo-text">
                Cliente → cliente|sushi123
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};