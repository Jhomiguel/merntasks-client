import React, { useContext } from "react";
import TareaContext from "../../contexts/tareas/TareaContext";
import ProyectoContext from "../../contexts/proyectos/ProyectoContext";

const Tarea = ({ tarea }) => {
  //Extrae un proyecto si esta activo
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  //obtener funciones del context de tarea
  const tareasContext = useContext(TareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual,
  } = tareasContext;

  //Extraer proyecto
  const [proyectoActual] = proyecto;

  //funcion que se ejecuta cuando se presiona Eliminar
  const handleClickEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  //Funcion que modifica el estado de las tareas
  const handleClickCambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  //Agrega una tarea una tarea actual cuando el usuario quiere editarla
  const handleClickSeleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => handleClickCambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => handleClickCambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          className="btn btn-primario"
          type="button"
          onClick={() => handleClickSeleccionarTarea(tarea)}
        >
          Editar
        </button>

        <button
          className="btn btn-secundario"
          type="button"
          onClick={() => handleClickEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
