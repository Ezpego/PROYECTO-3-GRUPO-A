import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";
const Footer = () => {
  const { token } = useContext(TokenContext);
  return (
    <>
      <p>Footer</p>
      {token && <NavBar />}
    </>
  );
};

export default Footer;