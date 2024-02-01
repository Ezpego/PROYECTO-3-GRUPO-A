import { RxExit } from "react-icons/rx";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";

const NavBar = () => {
  const { tokenUpdate } = useContext(TokenContext);

  const handleExitButton = () => {
    tokenUpdate("");
  };

  return (
    <>
      <RxExit onClick={handleExitButton} />
    </>
  );
};

export default NavBar;
