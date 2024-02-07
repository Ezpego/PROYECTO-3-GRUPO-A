import "./Footer.css";

import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";
const Footer = () => {
  const { token } = useContext(TokenContext);
  return (
    <footer className="footer">
      {token && <NavBar />}
    </footer>
  );
};

export default Footer;