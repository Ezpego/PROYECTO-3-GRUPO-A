// import { RxExit } from "react-icons/rx";
// import { useContext } from "react";
// import TokenContext from "../../context/TokenContext";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { useNavigate } from "react-router-dom";


const NavBar = () => {

    const navigate = useNavigate();


    const handleViewProfileClick = () => {
    navigate('/user/:userId/editProfile');  
    };



return (
    <>
        <ProfileIcon
        onViewProfileClick={handleViewProfileClick}
        />

    </>
);
};

export default NavBar;