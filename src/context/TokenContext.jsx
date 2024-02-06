import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { jwtDecode } from "jwt-decode";
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState("");
  // *AÑADIDO EZEQUIEL ESTADO PARA MANEJAR LOS ERRORES
  const [error, setError] = useState(null);
  // *AÑADIDO EZEQUIEL URLRAIZ DEL .ENV
  const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;

  // *AÑADIDO EZEQUIEL LLAMADA PARA CARGAR DATOS DE USUARIO EN SESIONES ABIERTAS
  useEffect(() => {
    const fetchData = async () => {
      const loggedUser = window.localStorage.getItem("token");
      console.log("este es el token que habia almacenado el local", loggedUser);

      if (loggedUser) {
        setToken(loggedUser);

        let descodificator = jwtDecode(loggedUser);

        console.log("este es el token seteado", loggedUser);

        try {
          const userDataResponse = await fetch(`${urlRaiz}/users/data`, {
            method: "GET",
            headers: {
              authorization: `${loggedUser}`,
            },
          });

          if (userDataResponse.ok) {
            const userData = await userDataResponse.json();
            setUserData(userData);
          } else {
            console.error("Error al obtener los datos del usuario");
            setUserData("");
            setError(null);
            setError("Error al obtener los datos del usuario");
          }
        } catch (error) {
          console.error("Error en la llamada Fetch:", error);
          setUserData("");
          setError("Error en la llamada Fetch");
        }

        if (descodificator.isAdministrator === 1) {
          setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
      }
    };

    fetchData(); // Llamada inmediata de la función asincrónica
  }, [urlRaiz, token]);

  // useEffect(() => {
  //   const loggedUser = window.localStorage.getItem("token");
  //   if (loggedUser) {
  //     setToken(loggedUser);

  //     let descodificator = jwtDecode(loggedUser);

  //     // setUserData(descodificator);

  //     if (descodificator.isAdministrator === 1) {
  //       setIsAdmin(true);
  //     }
  //   } else {
  //     setIsAdmin(false);
  //   }
  // }, []);

  const tokenUpdate = async (token) => {
    if (token) {
      setToken(token);

      window.localStorage.setItem("token", token);

      let descodificator = jwtDecode(token);

      console.log("el contenido del token es", { token });
      console.log("informacion dentro del Token", descodificator);
      // *AÑADIDO EZEQUIEL FETCH PARA ALMACENAR LOS DATOS DEL USER EN EL ESTADO USERDATA
      try {
        const userDataResponse = await fetch(`${urlRaiz}/users/data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: null,
        });

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserData(userData);
        } else {
          console.error("Error al obtener los datos del usuario");
          setUserData("");
          setError(null);
          setError("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error en la llamada Fetch:", error);
        setUserData("");
        setError("Error en la llamada Fetch");
      }
      // setUserData(descodificator);

      if (descodificator.isAdministrator === 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      window.localStorage.removeItem("token");
      setToken("");
      setIsAdmin(false);
      setUserData("");
    }
  };

  const updateUser = (newUserData) => {
    setUserData((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        tokenUpdate,
        userData,
        isAdmin,
        error,
        updateUser,
        clearError,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node,
};

export default TokenContext;
