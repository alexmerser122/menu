import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/reservar.css";

export const Reservar = () => {

  const { user } = useAuth();

  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    numero: "",
    personas: "",
    fecha: "",
    hora: ""
  });

  /* HORARIOS DEL RESTAURANTE (IGUAL QUE ADMIN) */

  const horariosRestaurante = {
    lunes: { inicio: 12, fin: 22 },
    martes: { inicio: 12, fin: 22 },
    miercoles: { inicio: 12, fin: 22 },
    jueves: { inicio: 12, fin: 22 },
    viernes: { inicio: 12, fin: 22 },
    sabado: { inicio: 13, fin: 23 },
    domingo: { inicio: 13, fin: 21 }
  };

  function generarHorarios(dia) {

    const config = horariosRestaurante[dia];
    if (!config) return [];

    let lista = [];
    let hora = config.inicio;

    while (hora < config.fin) {

      let fin = hora + 1.5;
      if (fin > config.fin) break;

      let inicioTxt = hora % 1 === 0 ? `${hora}:00` : `${Math.floor(hora)}:30`;
      let finTxt = fin % 1 === 0 ? `${fin}:00` : `${Math.floor(fin)}:30`;

      lista.push(`${inicioTxt} - ${finTxt}`);

      hora += 1.5;

    }

    return lista;

  }

  function obtenerDia(fecha) {

    const dias = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
    return dias[new Date(fecha).getDay()];

  }

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(data);

  }, []);

  const confirmarReserva = () => {

    if (!user) {
      alert("Debes iniciar sesión para reservar");
      return;
    }

    if (!mesaSeleccionada) {
      alert("Selecciona una mesa");
      return;
    }

    if (!formData.nombre || !formData.numero || !formData.personas || !formData.fecha || !formData.hora) {
      alert("Completa todos los campos");
      return;
    }

    if (formData.personas < 1 || formData.personas > 10) {
      alert("El número de personas debe ser entre 1 y 10");
      return;
    }

    const duplicada = reservas.find(
      (r) =>
        r.mesa === mesaSeleccionada &&
        r.fecha === formData.fecha &&
        r.horario === formData.hora
    );

    if (duplicada) {
      alert("Esta mesa ya está reservada en ese horario");
      return;
    }

    const nuevaReserva = {
      nombre: formData.nombre,
      numero: formData.numero,
      personas: formData.personas,
      fecha: formData.fecha,
      horario: formData.hora,
      mesa: mesaSeleccionada
    };

    const nuevasReservas = [...reservas, nuevaReserva];

    setReservas(nuevasReservas);
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));

    alert("Reserva confirmada");

  };

  const mesas = [1,2,3,4,5,6,7,8,9,10,11,12];

  const horarios = formData.fecha ? generarHorarios(obtenerDia(formData.fecha)) : [];

  return (

    <main className="reservar">

      <section className="reservar-header">
        <div className="reservar-header__wrap">

          <h1 className="reservar-header__title">
            <span className="reservar-header__title-span reservar-header__title-span--primary">
              Reservar
            </span>

            <span className="reservar-header__title-span reservar-header__title-span--accent">
              Mesa
            </span>
          </h1>

          <p className="reservar-header__subtitle">
            Selecciona tu mesa y completa el formulario
          </p>

        </div>
      </section>

      <section className="reservar-layout">
        <div className="reservar-layout__grid">

          {/* PLANO DE MESAS */}

          <div className="reservar-plano">

            <h2 className="reservar-plano__title">
              Plano del Restaurante
            </h2>

            <div className="reservar-plano__grid">

              {mesas.map((mesa) => {

                const reservada = reservas.some(
                  (r) =>
                    r.mesa === mesa &&
                    r.fecha === formData.fecha &&
                    r.horario === formData.hora
                );

                return (

                  <div key={mesa} className="reservar-plano__cell">

                    <button
                      type="button"
                      disabled={reservada}
                      onClick={() => setMesaSeleccionada(mesa)}
                      className={`reservar-plano__mesa ${
                        reservada
                          ? "reservar-plano__mesa--reservada"
                          : "reservar-plano__mesa--disponible"
                      }`}
                    >

                      <span className="reservar-plano__mesa-id">
                        #{mesa}
                      </span>

                    </button>

                  </div>

                );

              })}

            </div>

          </div>

          {/* FORMULARIO */}

          <div className="reservar-form">

            <h2 className="reservar-form__title">
              Formulario de Reserva
            </h2>

            <form className="reservar-form__body">

              <div className="reservar-form__selected">
                Mesa seleccionada: {mesaSeleccionada ? `#${mesaSeleccionada}` : "Ninguna"}
              </div>

              <div className="reservar-form__field">

                <label className="reservar-form__label">
                  Nombre Completo
                </label>

                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="reservar-form__input"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />

              </div>

              <div className="reservar-form__field">

                <label className="reservar-form__label">
                  Número de Teléfono
                </label>

                <input
                  type="tel"
                  placeholder="Tu número"
                  className="reservar-form__input"
                  value={formData.numero}
                  onChange={(e) =>
                    setFormData({ ...formData, numero: e.target.value })
                  }
                />

              </div>

              <div className="reservar-form__field">

                <label className="reservar-form__label">
                  Número de Personas
                </label>

                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Número de personas"
                  className="reservar-form__input"
                  value={formData.personas}
                  onChange={(e) =>
                    setFormData({ ...formData, personas: e.target.value })
                  }
                />

              </div>

              <div className="reservar-form__field">

                <label className="reservar-form__label">
                  Fecha
                </label>

                <input
                  type="date"
                  className="reservar-form__input"
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                />

              </div>

              {/* HORARIOS COMPATIBLES CON ADMIN */}

              <div className="reservar-form__field">

                <label className="reservar-form__label">
                  Horario
                </label>

                <select
                  className="reservar-form__input"
                  value={formData.hora}
                  onChange={(e) =>
                    setFormData({ ...formData, hora: e.target.value })
                  }
                >

                  <option value="">Seleccionar horario</option>

                  {horarios.map((h,i)=>{

                    const ocupado = reservas.some(
                      r =>
                        r.mesa === mesaSeleccionada &&
                        r.fecha === formData.fecha &&
                        r.horario === h
                    );

                    return(

                      <option
                        key={i}
                        value={h}
                        disabled={ocupado}
                        style={{
                          color: ocupado ? "#dc2626" : "#16a34a",
                          fontWeight:"600"
                        }}
                      >

                        {h} {ocupado ? "(ocupado)" : "(libre)"}

                      </option>

                    );

                  })}

                </select>

              </div>

              <button
                type="button"
                onClick={confirmarReserva}
                className="reservar-form__submit reservar-form__submit--enabled"
              >
                Confirmar Reserva
              </button>

            </form>

          </div>

        </div>
      </section>

    </main>

  );

};