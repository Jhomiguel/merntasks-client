import React, { useContext } from "react";
import ProyectoContext from "../../contexts/proyectos/ProyectoContext";
import TareaContext from "../../contexts/tareas/TareaContext";

const Proyecto = ({ proyecto }) => {
  //obtener state del context de proyecto
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContext;

  //obtener funciones del context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  //funcion para agregar proyecto actual
  const SeleccionarProyecto = (id) => {
    proyectoActual(id); //fijar un proyecto actual
    obtenerTareas(id); //Filtrar las tareas cuando se da click
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => SeleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
