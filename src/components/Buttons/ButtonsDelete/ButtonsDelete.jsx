import { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import TokenContext from "../../../context/TokenContext";
import { receiveExerciseList } from "../../../utils/consultasServidor";
import Modal from "react-modal";
import "./ButtonsDelete.css";

const ButtonsDelete = ({ id, exercises, setExercises }) => {
  const [modalIsOpen, setModalisOpen] = useState(false);
  const { token } = useContext(TokenContext);

  const handleOpenModal = (e) => {
    console.log(e.target);
    console.log("este es el id", id);
    setModalisOpen(true);
  };

  const handleCloseModal = () => {
    setModalisOpen(false);
  };
  const handleEraseButton = async (e) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: null,
      };

      const deleteResponse = await receiveExerciseList(
        `/exercises/${id}`,
        options
      );
      setModalisOpen(false);
      const newExercises = exercises.filter((exercise) => exercise.id !== id);
      setExercises(newExercises);
      console.log("respuesta borrado ", deleteResponse);
    } catch (error) {
      console.error("Error al cargar datos: ", error);
      setModalisOpen(false);
    }
  };

  return (
    <>
      <RiDeleteBin6Line className="buttonsdelete" onClick={handleOpenModal} />
      <Modal
        className="buttonsdelete"
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Eliminacion Ejercicio"
      >
        <p>Seguro que quieres borrar el ejercicio</p>
        <button onClick={handleEraseButton}>Si con toda mi fuerza</button>
        <button onClick={handleCloseModal}>No me he hecho caquita</button>
      </Modal>
    </>
  );
};

export default ButtonsDelete;