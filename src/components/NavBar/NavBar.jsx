// import ButtonsHome from "../Buttons/ButtonsHome/ButtonsHome";
// import ModalButton from "../ModalButton/ModalButton";
// import ProfileIcon from "../ProfileIcon/ProfileIcon";
// import TokenContext from "../../context/TokenContext";
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { SiAddthis } from "react-icons/si";

// const NavBar = () => {
//   const { isAdmin } = useContext(TokenContext);

//   return (
//     <>
//       <span className="navContainer">
//         {" "}
//         <ProfileIcon />
//         <ModalButton />
//         {isAdmin && (
//           <Link to="/exercises/">
//             <SiAddthis />
//           </Link>
//         )}
//         <ButtonsHome />
//       </span>
//     </>
//   );
// };

// export default NavBar;

import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiAddthis } from "react-icons/si";
import ButtonsHome from "../Buttons/ButtonsHome/ButtonsHome";
import ModalButton from "../ModalButton/ModalButton";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import TokenContext from "../../context/TokenContext";

const NavBar = () => {
    const { isAdmin } = useContext(TokenContext);
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isAdminPage = location.pathname === "/exercises/";

    return (
        <>
            <span className="navContainer">
                <ProfileIcon />
                {isHomePage && <ModalButton />}
                {isAdmin && !isAdminPage && (
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
