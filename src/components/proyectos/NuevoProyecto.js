import React, { Fragment, useState, useContext } from "react";
import ProyectoContext from "../../contexts/proyectos/ProyectoContext";
const NuevoProyecto = () => {
  //Obtener el state  del formulario del context
  const proyectosContext = useContext(ProyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //state para Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //extraer nombre del state proyecto
  const { nombre } = proyecto;
  //Leer los datos introducidos por el usuario
  const handleChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  //Cuando el usuario de Submit al form
  const handleSubmitProyecto = (e) => {
    e.preventDefault();

    //Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregar al State
    agregarProyecto(proyecto);

    //Reiniciar el Form
    guardarProyecto({
      nombre: "",
    });
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form
          className="formulario-nuevo-proyecto"
          onSubmit={handleSubmitProyecto}
        >
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del proyecyo"
            name="nombre"
            value={nombre}
            onChange={handleChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
