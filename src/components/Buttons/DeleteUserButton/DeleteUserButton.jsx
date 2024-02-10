import { useContext, useState } from "react";
import TokenContext from "../../../context/TokenContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const DeleteUserButton = ({ id }) => {
    const [modalIsOpen, setModalisOpen] = useState(false);
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    const handleOpenModal = (e) => {
        console.log(e.target);
        console.log("este es el id", id);
        setModalisOpen(true);
    };
    const handleCloseModal = () => {
        setModalisOpen(false);
    };
    const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;
    const handleDeleteButton = async (e) => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${token}`,
                },
                body: null,
            };

            const deleteResponse = await fetch(
                `${urlRaiz}/user/${id}/deleteProfile`,
                options
            );
            setModalisOpen(false);
            const result = await deleteResponse.json();
            console.log("respuesta borrado ", result);
            navigate("/");
        } catch (error) {
            console.error("Error al cargar datos: ", error);
            setModalisOpen(false);
        }
    };
    return (
        <>
            <button onClick={handleOpenModal}>Eliminar Usuario</button>
            <Modal
                className="deleteuser"
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Eliminación de usuario"
            >
                <strong>
                    Esta acción es irreversible. ¿Está seguro/a de continuar?
                </strong>
                <button onClick={handleDeleteButton}>SI</button>
                <button onClick={handleCloseModal}>NO</button>
            </Modal>
        </>
    );
};
export default DeleteUserButton;
