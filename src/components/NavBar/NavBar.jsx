import ButtonsHome from "../Buttons/ButtonsHome/ButtonsHome";
import ModalButton from "../ModalButton/ModalButton";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import TokenContext from "../../context/TokenContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SiAddthis } from "react-icons/si";

const NavBar = () => {
  const { tokenUpdate, isAdmin } = useContext(TokenContext);

  const handleExitButton = () => {
    tokenUpdate("");
  };

  const navContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
  };

  return (
    <>
      <span>
        {" "}
        <ProfileIcon />
        <ModalButton />
        {isAdmin && (
          <Link to="/exercises/">
            <SiAddthis />
          </Link>
        )}
        <ButtonsHome />
      </span>
    </>
  );
};

export default NavBar;
