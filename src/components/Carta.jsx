import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carta.css";

export const Carta = () => {

  const navigate = useNavigate();

  const irPedidos = () => {
    navigate("/pedidos");
  };

  return (
    <main className="carta">

      {/* HEADER */}
      <section className="carta-header">
        <div className="carta-header__wrap">

          <h1 className="carta-header__title">
            <span className="carta-header__title-span carta-header__title-span--primary">
              Nuestra
            </span>{" "}
            <span className="carta-header__title-span carta-header__title-span--accent">
              Carta
            </span>
          </h1>

          <p className="carta-header__subtitle">
            Explora nuestra selección de platillos japoneses auténticos
          </p>

        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="carta-categorias">
        <div className="carta-categorias__wrap">

          {/* ================= SUSHI ================= */}

          <div className="carta-categoria">

            <h2 className="carta-categoria__title">Sushi</h2>

            <div className="carta-categoria__grid">

              <article className="carta-plato">
                <img src="/img/sushi.jpg" alt="Sushi Variado" />
                <div className="carta-plato__body">
                  <h3>Sushi Variado</h3>
                  <span>$15</span>
                  <p>Selección premium de nigiri y maki.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/sashimi.jpg" alt="Sashimi de Salmón" />
                <div className="carta-plato__body">
                  <h3>Sashimi de Salmón</h3>
                  <span>$18</span>
                  <p>Cortes frescos de salmón.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/california-roll.jpg" alt="California Roll" />
                <div className="carta-plato__body">
                  <h3>California Roll</h3>
                  <span>$13</span>
                  <p>Roll con cangrejo, aguacate y pepino.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/spicy-tuna.jpg" alt="Spicy Tuna Roll" />
                <div className="carta-plato__body">
                  <h3>Spicy Tuna Roll</h3>
                  <span>$14</span>
                  <p>Roll de atún picante.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

            </div>
          </div>


          {/* ================= RAMEN ================= */}

          <div className="carta-categoria">

            <h2 className="carta-categoria__title">Ramen</h2>

            <div className="carta-categoria__grid">

              <article className="carta-plato">
                <img src="/img/ramen.jpg" alt="Ramen Tradicional" />
                <div className="carta-plato__body">
                  <h3>Ramen Tradicional</h3>
                  <span>$12</span>
                  <p>Caldo de cerdo con huevo marinado.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/ramen2.jpg" alt="Ramen Shoyu" />
                <div className="carta-plato__body">
                  <h3>Ramen Shoyu</h3>
                  <span>$11</span>
                  <p>Ramen con caldo de soja.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/ramen-miso.jpg" alt="Ramen Miso" />
                <div className="carta-plato__body">
                  <h3>Ramen Miso</h3>
                  <span>$13</span>
                  <p>Caldo miso con cerdo.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/ramen-picante.jpg" alt="Ramen Picante" />
                <div className="carta-plato__body">
                  <h3>Ramen Picante</h3>
                  <span>$14</span>
                  <p>Ramen con caldo picante.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

            </div>
          </div>


          {/* ================= TEMPURA ================= */}

          <div className="carta-categoria">

            <h2 className="carta-categoria__title">Tempura</h2>

            <div className="carta-categoria__grid">

              <article className="carta-plato">
                <img src="/img/tempura.jpg" alt="Tempura Camarón" />
                <div className="carta-plato__body">
                  <h3>Tempura Camarón</h3>
                  <span>$14</span>
                  <p>Camarones crujientes.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/tempura-verduras.jpg" alt="Tempura Verduras" />
                <div className="carta-plato__body">
                  <h3>Tempura Verduras</h3>
                  <span>$10</span>
                  <p>Verduras en tempura ligera.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/tempura-pescado.jpg" alt="Tempura Pescado" />
                <div className="carta-plato__body">
                  <h3>Tempura Pescado</h3>
                  <span>$13</span>
                  <p>Filete de pescado crujiente.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/tempura-mixta.jpg" alt="Tempura Mixta" />
                <div className="carta-plato__body">
                  <h3>Tempura Mixta</h3>
                  <span>$15</span>
                  <p>Camarones y verduras.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

            </div>
          </div>


          {/* ================= POSTRES ================= */}

          <div className="carta-categoria">

            <h2 className="carta-categoria__title">Postres</h2>

            <div className="carta-categoria__grid">

              <article className="carta-plato">
                <img src="/img/mochi.jpg" alt="Mochi" />
                <div className="carta-plato__body">
                  <h3>Mochi</h3>
                  <span>$6</span>
                  <p>Postre japonés tradicional.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/dorayaki.jpg" alt="Dorayaki" />
                <div className="carta-plato__body">
                  <h3>Dorayaki</h3>
                  <span>$7</span>
                  <p>Pancakes japoneses rellenos.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/helado-matcha.jpg" alt="Helado Matcha" />
                <div className="carta-plato__body">
                  <h3>Helado Matcha</h3>
                  <span>$5</span>
                  <p>Helado artesanal de té verde.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

              <article className="carta-plato">
                <img src="/img/cheesecake-matcha.jpg" alt="Cheesecake Matcha" />
                <div className="carta-plato__body">
                  <h3>Cheesecake Matcha</h3>
                  <span>$7</span>
                  <p>Cheesecake japonés de matcha.</p>
                  <button className="carta-plato__button" onClick={irPedidos}>
                    Pedir ahora
                  </button>
                </div>
              </article>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
};