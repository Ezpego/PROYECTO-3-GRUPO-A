import { CiHome } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const ButtonsHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <CiHome onClick={() => navigate("/")} />
    </>
  );
};

export default ButtonsHome;
