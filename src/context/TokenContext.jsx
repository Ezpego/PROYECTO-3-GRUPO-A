import { createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("token");
    if (loggedUser) {
      setToken(loggedUser);

      let descodificator = jwtDecode(loggedUser);

      setUserData(descodificator);

      if (descodificator.isAdministrator === 1) {
        setIsAdmin(true);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const tokenUpdate = (token) => {
    if (token) {
      setToken(token);

      window.localStorage.setItem("token", token);
      let descodificator = jwtDecode(token);

      console.log("el contenido del token es", { token });
      console.log(descodificator);
      setUserData(descodificator);

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

  return (
    <TokenContext.Provider
      value={{ token, setToken, tokenUpdate, userData, isAdmin }}
    >
      {children}
    </TokenContext.Provider>
  );
};
export default TokenContext;
