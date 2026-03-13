import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* BOOTSTRAP */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* ESTILOS */
import "../styles/navegacion.css";

export const Navegacion = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link navegacion__link navegacion__link--active"
      : "nav-link navegacion__link";

  const loginLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link navegacion__link navegacion__link--login navegacion__link--active"
      : "nav-link navegacion__link navegacion__link--login";

  return (

    <nav className="navbar navbar-expand-lg navbar-dark navegacion fixed-top">

      <div className="container navegacion__container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand navegacion__brand">

          <div className="navegacion__logo">
            <img
              src="/img/logo.png"
              alt="Sakura Sushi"
              className="navegacion__logo-img"
            />
          </div>

          <div>
            <div className="navegacion__brand-name">
              Sakura
            </div>

            <div className="navegacion__brand-tagline">
              Sushi House
            </div>
          </div>

        </Link>

        {/* BOTON MOBILE */}
        <button
          className="navbar-toggler navegacion__burger"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse navegacion__links" id="menuNavbar">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink to="/" className={linkClass} end>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/carta" className={linkClass}>
                Carta
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/reservar" className={linkClass}>
                Reservar Mesa
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/pedidos" className={linkClass}>
                Pedidos
              </NavLink>
            </li>

            {/* ADMIN SOLO SI ES ADMIN */}
            {user && user.rol === "admin" && (
              <li className="nav-item">
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              </li>
            )}

            {/* CLIENTE LOGUEADO → CERRAR SESIÓN */}
            {user && user.rol === "cliente" && (
              <li className="nav-item">
                <button
                  onClick={cerrarSesion}
                  className="nav-link navegacion__link navegacion__link--login"
                  style={{ background: "none", border: "none" }}
                >
                  Cerrar sesión
                </button>
              </li>
            )}

            {/* SIN LOGIN */}
            {!user && (
              <li className="nav-item">
                <NavLink to="/login" className={loginLinkClass}>
                  Login
                </NavLink>
              </li>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
};