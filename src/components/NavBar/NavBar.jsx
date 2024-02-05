import ProfileIcon from "../ProfileIcon/ProfileIcon";
import ModalButton from "../ModalButton/ModalButton";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router-dom";

import { SiAddthis } from "react-icons/si";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";

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
            <div style={navContainerStyle}>
                <ProfileIcon />
                <ModalButton buttonContext="texto del boton" />
                {isAdmin && (
                    <Link to="/exercises/">
                        <SiAddthis />
                    </Link>
                )}

                <RxExit onClick={handleExitButton} />
            </div>
        </>
    );
};

export default NavBar;
