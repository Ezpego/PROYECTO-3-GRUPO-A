import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ModalButton.css";
import { CiFilter } from "react-icons/ci";
import TokenContext from "../../context/TokenContext";
import { useContext } from "react";

const ModalButton = ({ buttonContext }) => {
  const { token } = useContext(TokenContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    muscleGroup: "",
    exerciseType: "",
    difficulty_level: "",
  });
  const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);
  const [exerciseTypeOptions, setExerciseTypeOptions] = useState([]);
  const [difficultyLevelOptions, setDifficultyLevelOptions] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log("Filters applied:", selectedFilters);
    // añadido Gabisas

    closeModal();
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch("http://localhost:3000/filter", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          throw {
            status: response.status,
            text: data.message || "There has been an error",
          };
        }

        const data = await response.json();
        setMuscleGroupOptions(
          data.muscle ? data.muscle.map((group) => group.name) : []
        );
        setExerciseTypeOptions(
          data.typology ? data.typology.map((typology) => typology.name) : []
        );
        console.log(data);

        setDifficultyLevelOptions(
          data.difficulty_level
            ? data.difficulty_level.map((level) => level)
            : []
        );
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  return (
    <div className="modal-button-container">
      <CiFilter className="modal-button" onClick={openModal}>
        {buttonContext}
      </CiFilter>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Filtrar Ejercicios"
        ariaHideApp={false}
        className="modal-content"
      >
        <div>
          <h2>Filtrar Ejercicios</h2>
          <label>
            <strong>Grupo Muscular:</strong>
            <select
              value={selectedFilters.muscleGroup}
              onChange={(e) =>
                handleFilterChange("muscleGroup", e.target.value)
              }
            >
              <option value="">Selecciona...</option>
              {muscleGroupOptions.map((muscleGroup, index) => (
                <option key={index} value={muscleGroup}>
                  {muscleGroup}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            <strong>Tipología de Ejercicio:</strong>
            <select
              value={selectedFilters.exerciseType}
              onChange={(e) =>
                handleFilterChange("exerciseType", e.target.value)
              }
            >
              <option value="">Selecciona...</option>
              {exerciseTypeOptions.map((exerciseType, index) => (
                <option key={index} value={exerciseType}>
                  {exerciseType}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            <strong>Nivel de Dificultad:</strong>
            <select
              value={selectedFilters.difficulty_level}
              onChange={(e) =>
                handleFilterChange("difficulty_level", e.target.value)
              }
            >
              <option value="">Selecciona...</option>
              {difficultyLevelOptions.map((difficultyLevel, index) => (
                <option key={index} value={difficultyLevel}>
                  {difficultyLevel}
                </option>
              ))}
            </select>
          </label>
          <br />

          <button onClick={handleApplyFilters}>Aplicar Filtros</button>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalButton;
