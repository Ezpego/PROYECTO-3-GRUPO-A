import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const ButtonsEdit = ({ exerciseObj }) => {
    const navigate = useNavigate();
    const handleEditButton = () => {
        navigate("/exercises/edited", { state: exerciseObj });
    };
    return (
        <>
            <LuPencil onClick={handleEditButton}></LuPencil>
        </>
    );
};

export default ButtonsEdit;
