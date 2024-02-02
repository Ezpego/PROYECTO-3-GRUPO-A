import ProfileIcon from "../ProfileIcon/ProfileIcon";
import ModalButton from "../ModalButton/ModalButton";
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
            <ProfileIcon />
            <ModalButton buttonContext="texto del boton" />
            <RxExit onClick={handleExitButton} />
        </>
    );
};

export default NavBar;
