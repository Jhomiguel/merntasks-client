import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../contexts/autenticacion/AuthContext";

//Componente que toma un input de otro componente para revisar si el usuario esta autenticado
//En caso de que no lo este se redirige a la pagina de Iniciar Sesion, en caso de que si Se redirige al Componente
//De Proyectos. De esta forma se protege la ruta Proyectos
const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { cargando, autenticado, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
