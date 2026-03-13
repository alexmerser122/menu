import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/admin.css";

export function Admin() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [historial, setHistorial] = useState([]);

  const [tab, setTab] = useState("reservas");

  const [mesaReserva, setMesaReserva] = useState(null);
  const [mesaPedido, setMesaPedido] = useState(null);
  const [horarioPedido, setHorarioPedido] = useState("");

  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [personas, setPersonas] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");

  /* MENU */

  const platos = [
    { nombre: "Sushi Variado", precio: 15 },
    { nombre: "Sashimi de Salmón", precio: 18 },
    { nombre: "California Roll", precio: 13 },
    { nombre: "Spicy Tuna Roll", precio: 14 },

    { nombre: "Ramen Tradicional", precio: 12 },
    { nombre: "Ramen Shoyu", precio: 11 },
    { nombre: "Ramen Miso", precio: 13 },
    { nombre: "Ramen Picante", precio: 14 },

    { nombre: "Tempura Camarón", precio: 14 },
    { nombre: "Tempura Verduras", precio: 10 },
    { nombre: "Tempura Pescado", precio: 13 },
    { nombre: "Tempura Mixta", precio: 15 },

    { nombre: "Mochi", precio: 6 },
    { nombre: "Dorayaki", precio: 7 },
    { nombre: "Helado Matcha", precio: 5 },
    { nombre: "Cheesecake Matcha", precio: 7 }
  ];

  /* HORARIOS */

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

  /* HORARIOS DISPONIBLES */

  function horariosDisponibles(mesa) {

    const fechaActual = fecha || new Date().toISOString().split("T")[0];

    const dia = obtenerDia(fechaActual);
    const todos = generarHorarios(dia);

    const ocupados = [

      ...reservas
        .filter(r => r.mesa === mesa && r.fecha === fechaActual)
        .map(r => r.horario),

      ...pedidos
        .filter(p => p.mesa === mesa && p.fecha === fechaActual)
        .map(p => p.hora)

    ];

    return todos.filter(h => !ocupados.includes(h));
  }

  /* CARGAR DATOS */

  useEffect(() => {

    setReservas(JSON.parse(localStorage.getItem("reservas")) || []);
    setPedidos(JSON.parse(localStorage.getItem("pedidosAdmin")) || []);
    setHistorial(JSON.parse(localStorage.getItem("historialPedidos")) || []);

  }, []);

  /* LOGOUT */

  const handleCerrarSesion = () => {

    logout();
    navigate("/login",{ replace:true });

  };

  /* CREAR RESERVA */

  const crearReserva = (e) => {

    e.preventDefault();

    if (!mesaReserva) {
      alert("Selecciona una mesa");
      return;
    }

    const nuevaReserva = {
      nombre,
      numero,
      personas,
      fecha,
      horario,
      mesa: mesaReserva
    };

    const nuevas = [...reservas,nuevaReserva];

    setReservas(nuevas);
    localStorage.setItem("reservas",JSON.stringify(nuevas));

    setNombre("");
    setNumero("");
    setPersonas("");
    setFecha("");
    setHorario("");
  };

  /* CANCELAR RESERVA */

  const cancelarReserva = (index) => {

    const nuevas = reservas.filter((_,i)=> i !== index);

    setReservas(nuevas);
    localStorage.setItem("reservas",JSON.stringify(nuevas));
  };

  /* PEDIDO DESDE RESERVA */

  const iniciarPedido = (reserva) => {

    setMesaPedido(reserva.mesa);
    setHorarioPedido(reserva.horario);
    setTab("pedidos");

    if(!pedidos.find(p=> p.mesa === reserva.mesa)){

      const nuevoPedido = {
        mesa: reserva.mesa,
        cliente: reserva.nombre,
        hora: reserva.horario,
        fecha: reserva.fecha,
        productos: [],
        total: 0
      };

      const nuevos = [...pedidos,nuevoPedido];

      setPedidos(nuevos);
      localStorage.setItem("pedidosAdmin",JSON.stringify(nuevos));
    }
  };

  /* PEDIDO PRESENCIAL */

  const pedidoPresencial = (mesa) => {

    setMesaPedido(mesa);
    setHorarioPedido("");
  };

  /* CREAR PEDIDO PRESENCIAL */

  const iniciarPedidoPresencial = () => {

    if(!mesaPedido || !horarioPedido){
      alert("Selecciona mesa y horario");
      return;
    }

    const fechaActual = fecha || new Date().toISOString().split("T")[0];

    const ocupadoReserva = reservas.some(
      r => r.mesa === mesaPedido && r.horario === horarioPedido && r.fecha === fechaActual
    );

    const ocupadoPedido = pedidos.some(
      p => p.mesa === mesaPedido && p.hora === horarioPedido && p.fecha === fechaActual
    );

    if(ocupadoReserva || ocupadoPedido){
      alert("Ese horario ya está ocupado");
      return;
    }

    const nuevoPedido = {

      mesa: mesaPedido,
      cliente: "Presencial",
      hora: horarioPedido,
      fecha: fechaActual,
      productos: [],
      total: 0
    };

    const nuevos = [...pedidos,nuevoPedido];

    setPedidos(nuevos);
    localStorage.setItem("pedidosAdmin",JSON.stringify(nuevos));
  };

  /* AGREGAR PLATO */

  const agregarPedido = (plato) => {

    const index = pedidos.findIndex(p=> p.mesa === mesaPedido);
    if(index === -1) return;

    const nuevos = [...pedidos];

    nuevos[index].productos.push(plato);
    nuevos[index].total += plato.precio;

    setPedidos(nuevos);
    localStorage.setItem("pedidosAdmin",JSON.stringify(nuevos));
  };

  /* ELIMINAR PLATO */

  const eliminarPlato = (mesa,indexPlato) => {

    const indexPedido = pedidos.findIndex(p=> p.mesa === mesa);
    if(indexPedido === -1) return;

    const nuevos = [...pedidos];

    const plato = nuevos[indexPedido].productos[indexPlato];

    nuevos[indexPedido].productos.splice(indexPlato,1);
    nuevos[indexPedido].total -= plato.precio;

    setPedidos(nuevos);
    localStorage.setItem("pedidosAdmin",JSON.stringify(nuevos));
  };

  /* CANCELAR PEDIDO */

  const cancelarPedido = (index) => {

    const nuevos = pedidos.filter((_,i)=> i !== index);

    setPedidos(nuevos);
    localStorage.setItem("pedidosAdmin",JSON.stringify(nuevos));
  };

  /* HISTORIAL */

  const enviarHistorial = (index) => {

    const pedido = pedidos[index];

    const nuevoHistorial = [...historial,pedido];

    setHistorial(nuevoHistorial);
    localStorage.setItem("historialPedidos",JSON.stringify(nuevoHistorial));

    const nuevosPedidos = pedidos.filter((_,i)=> i !== index);

    setPedidos(nuevosPedidos);
    localStorage.setItem("pedidosAdmin",JSON.stringify(nuevosPedidos));
  };

  const mesasReservadas = reservas.length;
  const mesasOcupadas = pedidos.length;
  const pedidosActivos = pedidos.length;



/* RENDER */

return (

  <main className="admin">

    <section className="admin-header">

      <h1>Panel Administración</h1>

      <button onClick={handleCerrarSesion}>
        Cerrar sesión
      </button>

    </section>

    <div className="admin-panel">

      <div className="panel-card reservadas">
        <p>Mesas Reservadas</p>
        <h2>{mesasReservadas}</h2>
      </div>

      <div className="panel-card ocupadas">
        <p>Mesas Ocupadas</p>
        <h2>{mesasOcupadas}</h2>
      </div>

      <div className="panel-card pedidos">
        <p>Pedidos Activos</p>
        <h2>{pedidosActivos}</h2>
      </div>

    </div>

    <div className="admin-tabs">

      <button onClick={() => setTab("reservas")}>Reservas</button>
      <button onClick={() => setTab("pedidos")}>Pedidos</button>
      <button onClick={() => setTab("historial")}>Historial</button>

    </div>

    {/* MAPA MESAS */}

    {(tab === "reservas" || tab === "pedidos") &&(

      <div className="admin-mapa-mesas">

        {[...Array(12)].map((_, i) => (

          <button
            key={i + 1}
            className="admin-mesa"
            onClick={() => {

              if (tab === "reservas") setMesaReserva(i + 1);
              if (tab === "pedidos") pedidoPresencial(i + 1);

            }}
          >

            Mesa {i + 1}

          </button>

        ))}

      </div>

    )}

    {/* RESERVAS */}

    {tab === "reservas" && (

      <section>

        <form onSubmit={crearReserva}>

          <input
            placeholder="Cliente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            placeholder="Teléfono"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Número de personas"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            min="1"
            max="10"
            required
          />

          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          >

            <option value="">Horario</option>

            {generarHorarios(obtenerDia(fecha)).map((h, i) => {

              const ocupado =
                reservas.some(
                  r => r.mesa === mesaReserva && r.horario === h && r.fecha === fecha
                ) ||
                pedidos.some(
                  p => p.mesa === mesaReserva && p.hora === h && p.fecha === fecha
                );

              return (

                <option
                  key={i}
                  value={h}
                  disabled={ocupado}
                  style={{
                    color: ocupado ? "#dc2626" : "#16a34a",
                    fontWeight: "600"
                  }}
                >
                  {h} {ocupado ? "(ocupado)" : "(libre)"}
                </option>

              );

            })}

          </select>

          <p>Mesa seleccionada: {mesaReserva || "Ninguna"}</p>

          <button type="submit">
            Crear reserva
          </button>

        </form>

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Personas</th>
              <th>Mesa</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {reservas.map((reserva, index) => (

              <tr key={index}>

                <td>{index + 1}</td>
                <td>{reserva.nombre}</td>
                <td>{reserva.personas}</td>
                <td>{reserva.mesa}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.horario}</td>

                <td>

                  <button onClick={() => iniciarPedido(reserva)}>
                    Hacer pedido
                  </button>

                  <button onClick={() => cancelarReserva(index)}>
                    Cancelar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>

    )}

    {/* PEDIDOS */}

    {tab === "pedidos" && (

      <section>

        <h2>Mesa seleccionada: {mesaPedido}</h2>

        <select
          value={horarioPedido}
          onChange={(e) => setHorarioPedido(e.target.value)}
        >

          <option value="">Seleccionar horario</option>

          {horariosDisponibles(mesaPedido).map((h, i) => (
            <option key={i} value={h}>{h}</option>
          ))}

        </select>

        <button onClick={iniciarPedidoPresencial}>
          Iniciar pedido
        </button>

        <div className="platos">

          {platos.map((plato, index) => (

            <button
              key={index}
              onClick={() => agregarPedido(plato)}
            >

              {plato.nombre} - ${plato.precio}

            </button>

          ))}

        </div>

        <table>

          <thead>
            <tr>
              <th>Mesa</th>
              <th>Cliente</th>
              <th>Hora</th>
              <th>Platos</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {pedidos.map((pedido, index) => (

              <tr key={index}>

                <td>{pedido.mesa}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.hora}</td>

                <td>

                  {pedido.productos.map((p, i) => (

                    <div key={i}>

                      {p.nombre}

                      <button
                        onClick={() => eliminarPlato(pedido.mesa, i)}
                        style={{ marginLeft: "8px", color: "red" }}
                      >

                        ❌

                      </button>

                    </div>

                  ))}

                </td>

                <td>${pedido.total}</td>

                <td>

                  <button onClick={() => setMesaPedido(pedido.mesa)}>
                    Agregar
                  </button>

                  <button onClick={() => cancelarPedido(index)}>
                    Cancelar
                  </button>

                  <button onClick={() => enviarHistorial(index)}>
                    Pedido completado
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>

    )}

    {/* HISTORIAL */}

    {tab === "historial" && (

      <section>

        <h2>Historial de pedidos</h2>

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Mesa</th>
              <th>Cliente</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {historial.map((p, index) => (

              <tr key={index}>
                <td>{index + 1}</td>
                <td>{p.mesa}</td>
                <td>{p.cliente}</td>
                <td>${p.total}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </section>

    )}

  </main>

);}