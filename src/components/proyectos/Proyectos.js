import React, { useContext, useEffect } from "react";
import SideBar from "../layout/SideBar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../contexts/autenticacion/AuthContext";

const Proyectos = () => {
  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  //Para mantenerse logeado incluso si se recarga la pagina web
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="contenedor-app">
      <aside>
        <SideBar />
      </aside>
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas"></div>
          <ListadoTareas />
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
