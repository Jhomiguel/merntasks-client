import React, { useContext, useEffect } from "react";

import Proyecto from "./Proyecto";

import ProyectoContext from "../../contexts/proyectos/ProyectoContext";
import AlertaContext from "../../contexts/alertas/AlertaContext";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  //extrayendo proyectos del state de ProyectoContext
  const proyectosContext = useContext(ProyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  //Extrayendo alertas del contexts
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Obtener proyecto cuando carga el componente
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);

  //Revisar si el state de proyectos tiene contenido
  if (proyectos.length === 0) return <p>No hay proyectos, crea uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
