import clienteAxios from "./axios";

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //En caso de que el token expire o el cliente cierre sesion se elimina token
    delete clienteAxios.defaults.headers.common["x-auth-token"];
  }
};

export default tokenAuth;
