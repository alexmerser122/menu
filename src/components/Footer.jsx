import React from "react";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer__container">

        {/* INFO RESTAURANTE */}
        <div className="footer__col">
          <h3 className="footer__title">Sakura Sushi House</h3>

          <p className="footer__text">
            Vive una experiencia auténtica de la cocina japonesa en un
            ambiente elegante y acogedor.
          </p>
        </div>


        {/* HORARIO */}
        <div className="footer__col">
          <h3 className="footer__title">Horario</h3>

          <p className="footer__text">
            Lunes - Viernes: 12:00 PM - 10:00 PM
          </p>

          <p className="footer__text">
            Sábados: 1:00 PM - 11:00 PM
          </p>

          <p className="footer__text">
            Domingos: 1:00 PM - 9:00 PM
          </p>
        </div>


        {/* CONTACTO */}
        <div className="footer__col">
          <h3 className="footer__title">Contacto</h3>

          <p className="footer__text">
            Av. Principal 123, Lima
          </p>

          <p className="footer__text">
            +51 987 654 321
          </p>

          <p className="footer__text">
            contacto@sakura.com
          </p>
        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="footer__bottom">
        © 2026 Sakura Sushi House. Todos los derechos reservados.
      </div>

    </footer>
  );
};