import React from "react";
import { Link } from "react-router-dom";
import "../styles/inicio.css";

export const Inicio = () => {
  return (
    <main className="inicio">

      {/* HERO */}
      <section className="inicio-hero">

        <img
          className="inicio-hero__img"
           src={process.env.PUBLIC_URL + "/img/hero-sakura.jpg"}
           alt="Sakura restaurante"
        />

        <div className="inicio-hero__contenido">

          <h1 className="inicio-hero__title">
            <span>Bienvenido a </span>
            <span>Sakura</span>
          </h1>

          <p className="inicio-hero__subtitle">
            Experiencia auténtica de la cocina japonesa
          </p>

          <Link to="/reservar" className="inicio-hero__cta">
            Reservar Ahora
          </Link>

        </div>

      </section>


      {/* SERVICIOS */}
      <section className="inicio-servicios">
        <div className="inicio-servicios__grid">

          <article className="inicio-servicios__card">
            <div className="inicio-servicios__icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2>Reserva Fácil</h2>

            <p>
              Sistema de reservas intuitivo para garantizar tu mesa
            </p>
          </article>


          <article className="inicio-servicios__card">
            <div className="inicio-servicios__icon">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4m0 12v4M8 18h4M8 6h3M8 10h4M8 14h3"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 2l2 20M16 2l4 6"/>
              </svg>
            </div>

            <h2>Menú Exclusivo</h2>

            <p>
              Platos preparados por chefs expertos en cocina japonesa
            </p>
          </article>


          <article className="inicio-servicios__card">
            <div className="inicio-servicios__icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5"
                />
              </svg>
            </div>

            <h2>Pedidos Rápidos</h2>

            <p>
              Ordena desde tu mesa de forma digital y eficiente
            </p>
          </article>

        </div>
      </section>


      {/* PLATOS DESTACADOS */}
      <section className="inicio-platos">

        <div className="inicio-platos__wrap">

          <h2 className="inicio-platos__title">
            <span>Nuestros Platos </span>
            <span>Destacados</span>
          </h2>

          <p className="inicio-platos__subtitle">
            Descubre los sabores auténticos de Japón
          </p>


          <div className="inicio-platos__grid">

            {/* SUSHI */}
            <article className="inicio-platos__card">
              <div className="inicio-platos__card-image">
                <img src={process.env.PUBLIC_URL + "/img/sushi.jpg"} alt="Sushi Variado" />
              </div>

              <div className="inicio-platos__card-body">

                <h3 className="inicio-platos__card-title">
                  Sushi Variado
                </h3>

                <p className="inicio-platos__card-desc">
                  Selección premium de nigiri y maki con salmón,
                  atún y anguila.
                </p>

                <div className="inicio-platos__card-footer">
                  <p className="inicio-platos__card-price">$15</p>

                  <Link to="/pedidos" className="inicio-platos__card-btn">
                    Ordenar
                  </Link>
                </div>

              </div>
            </article>


            {/* RAMEN */}
            <article className="inicio-platos__card">
              <div className="inicio-platos__card-image">
                <img src={process.env.PUBLIC_URL + "/img/ramen.jpg"} alt="Ramen Tradicional" />
              </div>

              <div className="inicio-platos__card-body">

                <h3 className="inicio-platos__card-title">
                  Ramen Tradicional
                </h3>

                <p className="inicio-platos__card-desc">
                  Caldo de hueso de cerdo, huevo marinado,
                  chashu y bambú.
                </p>

                <div className="inicio-platos__card-footer">
                  <p className="inicio-platos__card-price">$12</p>

                  <Link to="/pedidos" className="inicio-platos__card-btn">
                    Ordenar
                  </Link>
                </div>

              </div>
            </article>


            {/* TEMPURA */}
            <article className="inicio-platos__card">
              <div className="inicio-platos__card-image">
                <img src={process.env.PUBLIC_URL + "/img/tempura.jpg"} alt="Tempura de Camarón"/>
              </div>

              <div className="inicio-platos__card-body">

                <h3 className="inicio-platos__card-title">
                  Tempura de Camarón
                </h3>

                <p className="inicio-platos__card-desc">
                  Camarones crujientes con salsa tentsuyu
                  y rábano daikon.
                </p>

                <div className="inicio-platos__card-footer">
                  <p className="inicio-platos__card-price">$14</p>

                  <Link to="/pedidos" className="inicio-platos__card-btn">
                    Ordenar
                  </Link>
                </div>

              </div>
            </article>


            {/* MOCHI */}
            <article className="inicio-platos__card">
              <div className="inicio-platos__card-image">
                <img src={process.env.PUBLIC_URL + "/img/mochi.jpg"} alt="Mochi Japonés"/>
              </div>

              <div className="inicio-platos__card-body">

                <h3 className="inicio-platos__card-title">
                  Mochi Japonés
                </h3>

                <p className="inicio-platos__card-desc">
                  Delicioso postre de arroz glutinoso
                  con relleno de té verde.
                </p>

                <div className="inicio-platos__card-footer">
                  <p className="inicio-platos__card-price">$6</p>

                  <Link to="/pedidos" className="inicio-platos__card-btn">
                    Ordenar
                  </Link>
                </div>

              </div>
            </article>

          </div>


          <div className="inicio-platos__cta-wrap">
            <Link to="/carta" className="inicio-platos__cta">
              Ver Carta Completa
            </Link>
          </div>

        </div>

      </section>


      {/* CTA FINAL */}
      <section className="inicio-cta">

        <img
          className="inicio-cta__img"
          src={process.env.PUBLIC_URL + "/img/cta-sakura.jpg"}
         alt="Restaurante Sakura"
        />

        <div className="inicio-cta__contenido">

          <h2 className="inicio-cta__title">
            ¿Listo para una experiencia única?
          </h2>

          <p className="inicio-cta__text">
            Reserva tu mesa ahora y disfruta de la mejor cocina japonesa
          </p>

          <Link to="/reservar" className="inicio-cta__btn">
            Hacer Reservación
          </Link>

        </div>

      </section>

    </main>
  );
};