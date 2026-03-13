import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/pedidos.css";

export const Pedidos = () => {

  const { user } = useAuth();

  const [mesa, setMesa] = useState(1);
  const [pedido, setPedido] = useState([]);

  const platos = [
    { nombre:"Sushi Variado",precio:15,img:"/img/sushi.jpg"},
    { nombre:"Sashimi de Salmón",precio:18,img:"/img/sashimi.jpg"},
    { nombre:"California Roll",precio:13,img:"/img/california-roll.jpg"},
    { nombre:"Spicy Tuna Roll",precio:14,img:"/img/spicy-tuna.jpg"},

    { nombre:"Ramen Tradicional",precio:12,img:"/img/ramen.jpg"},
    { nombre:"Ramen Shoyu",precio:11,img:"/img/ramen2.jpg"},
    { nombre:"Ramen Miso",precio:13,img:"/img/ramen-miso.jpg"},
    { nombre:"Ramen Picante",precio:14,img:"/img/ramen-picante.jpg"},

    { nombre:"Tempura Camarón",precio:14,img:"/img/tempura.jpg"},
    { nombre:"Tempura Verduras",precio:10,img:"/img/tempura-verduras.jpg"},
    { nombre:"Tempura Pescado",precio:13,img:"/img/tempura-pescado.jpg"},
    { nombre:"Tempura Mixta",precio:15,img:"/img/tempura-mixta.jpg"},

    { nombre:"Mochi",precio:6,img:"/img/mochi.jpg"},
    { nombre:"Dorayaki",precio:7,img:"/img/dorayaki.jpg"},
    { nombre:"Helado Matcha",precio:5,img:"/img/helado-matcha.jpg"},
    { nombre:"Cheesecake Matcha",precio:7,img:"/img/cheesecake-matcha.jpg"}
  ];

  /* AGREGAR PRODUCTO */

  const agregarProducto = (plato) => {

    const existe = pedido.find(p => p.nombre === plato.nombre);

    if(existe){

      const nuevo = pedido.map(p =>
        p.nombre === plato.nombre
        ? {...p,cantidad:p.cantidad+1}
        : p
      );

      setPedido(nuevo);

    }else{

      setPedido([
        ...pedido,
        {
          nombre:plato.nombre,
          precio:plato.precio,
          cantidad:1
        }
      ]);

    }

  };

  /* AUMENTAR */

  const aumentar = (index)=>{

    const nuevo=[...pedido];
    nuevo[index].cantidad+=1;
    setPedido(nuevo);

  };

  /* DISMINUIR */

  const disminuir = (index)=>{

    const nuevo=[...pedido];

    if(nuevo[index].cantidad>1){
      nuevo[index].cantidad-=1;
    }

    setPedido(nuevo);

  };

  /* ELIMINAR */

  const eliminar = (index)=>{

    const nuevo = pedido.filter((_,i)=> i!==index);
    setPedido(nuevo);

  };

  /* TOTAL */

  const total = pedido.reduce(
    (suma,item)=> suma + item.precio * item.cantidad,
    0
  );

  /* CONFIRMAR PEDIDO */

  const confirmarPedido = ()=>{

    if(!user){
      alert("Debes iniciar sesión para hacer un pedido");
      return;
    }

    if(pedido.length===0){
      alert("Agrega productos al pedido");
      return;
    }

    const pedidosAdmin =
      JSON.parse(localStorage.getItem("pedidosAdmin")) || [];

    const ahora = new Date();

    const fecha = ahora.toISOString().split("T")[0];

    const hora =
      ahora.getHours().toString().padStart(2,"0")+":"+
      ahora.getMinutes().toString().padStart(2,"0");

    const nuevoPedido = {
      mesa,
      cliente:user.nombre || "Cliente",
      fecha,
      hora,
      productos:pedido,
      total
    };

    const nuevos=[...pedidosAdmin,nuevoPedido];

    localStorage.setItem("pedidosAdmin",JSON.stringify(nuevos));

    setPedido([]);

    alert("Pedido enviado correctamente");

  };

  const cancelarPedido = ()=>{
    setPedido([]);
  };

  return (

    <main className="pedidos">

      <section className="pedidos-layout">

        <div className="pedidos-layout__grid">

          {/* IZQUIERDA */}

          <div className="pedidos-main">

            {/* MESAS */}

            <div className="pedidos-mesas">

              <h2>Seleccionar Mesa</h2>

              <div className="pedidos-mesas__grid">

                {[1,2,3,4,5,6,7,8,9,10,11,12].map((m)=>(
                  <button
                    key={m}
                    onClick={()=>setMesa(m)}
                    className={
                      mesa===m
                      ? "pedidos-mesa pedidos-mesa--selected"
                      : "pedidos-mesa pedidos-mesa--default"
                    }
                  >
                    #{m}
                  </button>
                ))}

              </div>

            </div>

            {/* MENU */}

            <div className="pedidos-menu">

              <h2>Menú Disponible</h2>

              <div className="pedidos-menu__grid">

                {platos.map((plato,index)=>(

                  <div key={index} className="pedidos-menu__item">

                    <div className="pedidos-menu__thumb">

                      <img
                        src={plato.img}
                        alt={plato.nombre}
                        className="pedidos-menu__thumb-img"
                      />

                    </div>

                    <div className="pedidos-menu__info">

                      <h3 className="pedidos-menu__name">
                        {plato.nombre}
                      </h3>

                      <p className="pedidos-menu__price">
                        ${plato.precio}
                      </p>

                    </div>

                    <button
                      className="pedidos-menu__add pedidos-menu__add--enabled"
                      onClick={()=>agregarProducto(plato)}
                    >
                      +
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RESUMEN */}

          <div className="pedidos-resumen-col">

            <div className="pedidos-resumen">

              <h2 className="pedidos-resumen__title">
                🛒 Resumen del Pedido
              </h2>

              {pedido.length===0 &&(
                <p className="pedidos-resumen__empty-text">
                  Tu pedido está vacío
                </p>
              )}

              {pedido.map((item,index)=>(

                <div key={index} className="pedidos-resumen__item">

                  <div className="pedidos-resumen__item-top">

                    <span className="pedidos-resumen__item-name">
                      {item.nombre}
                    </span>

                    <button
                      className="pedidos-resumen__delete"
                      onClick={()=>eliminar(index)}
                    >
                      🗑
                    </button>

                  </div>

                  <div className="pedidos-resumen__price">
                    ${item.precio}
                  </div>

                  <div className="pedidos-resumen__controls">

                    <button
                      className="pedidos-resumen__btn pedidos-resumen__btn-minus"
                      onClick={()=>disminuir(index)}
                    >
                      -
                    </button>

                    <span className="pedidos-resumen__qty">
                      {item.cantidad}
                    </span>

                    <button
                      className="pedidos-resumen__btn pedidos-resumen__btn-plus"
                      onClick={()=>aumentar(index)}
                    >
                      +
                    </button>

                    <span className="pedidos-resumen__item-total">
                      ${(item.precio*item.cantidad).toFixed(2)}
                    </span>

                  </div>

                </div>

              ))}

              <div className="pedidos-resumen__total">

                <span>Total:</span>

                <span>${total.toFixed(2)}</span>

              </div>

              <button
                className="pedidos-resumen__confirm"
                onClick={confirmarPedido}
              >
                ✔ Confirmar Pedido
              </button>

              <button
                className="pedidos-resumen__cancel"
                onClick={cancelarPedido}
              >
                Cancelar Pedido
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

};