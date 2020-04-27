import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../contexts/proyectos/ProyectoContext";
import TareaContext from "../../contexts/tareas/TareaContext";

const FormTarea = () => {
  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  //obtener funcion de agregar tarea del context de tarea
  const tareasContext = useContext(TareaContext);
  const {
    //state
    errortarea,
    tareaseleccionada,
    //Funciones
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    LimpiarTarea,
  } = tareasContext;

  //state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada != null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //Si no hay proyecto seleccionado
  if (!proyecto) return null;

  //Extraer nombre de la tarea
  const { nombre } = tarea;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Si es edicion o si es nueva tarea
    if (tareaseleccionada === null) {
      //Tarea nueva
      //Agregar nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //actualizar tarea existente
      actualizarTarea(tarea);
      //Elimina tarea seleccionada del state
      LimpiarTarea();
    }

    //Obtener y filtrar las tareas del proyecto actual (Recargar las tareas del proyecto actual)
    obtenerTareas(proyectoActual.id);

    //Reiniciar form
    guardarTarea({ nombre: "" });
  };
  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block btn-submit"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
