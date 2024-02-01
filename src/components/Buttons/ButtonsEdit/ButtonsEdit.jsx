import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const ButtonsEdit = ({ exerciseObj }) => {
  const navigate = useNavigate();
  const handleEditButton = () => {
    navigate("/admin", { state: exerciseObj });
  };
  return (
    <>
      <LuPencil onClick={handleEditButton}></LuPencil>
    </>
  );
};

export default ButtonsEdit;