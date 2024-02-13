import { useNavigate } from "react-router-dom";
import "./ButtonsHome.css";
import { CiHome } from "react-icons/ci";

const ButtonsHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <CiHome className="whiteFill" onClick={() => navigate("/")} />
    </>
  );
};

export default ButtonsHome;
