import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ModalButton.css";
import { CiFilter } from "react-icons/ci";
import TokenContext from "../../context/TokenContext";
import { useContext } from "react";

const ModalButton = ({ buttonContext }) => {
  const { token, updateFilter } = useContext(TokenContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    muscleGroup: "",
    exerciseType: "",
    difficulty_level: "",
    like: false,
    favorite: false,
  });
  const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);
  const [exerciseTypeOptions, setExerciseTypeOptions] = useState([]);
  const [difficultyLevelOptions, setDifficultyLevelOptions] = useState([]);
  const [favoriteChecked, setFavoriteChecked] = useState(false);
  const [likeChecked, setLikeChecked] = useState(false);
  const [emptyFilter, setEmptyFiltre] = useState(false);

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
    setEmptyFiltre(true);
  };

  const handleApplyFilters = () => {
    console.log("Filters applied:", selectedFilters);
    // añadido filtrado

    updateFilter(selectedFilters);

    setSelectedFilters({
      muscleGroup: "",
      exerciseType: "",
      difficulty_level: "",
      like: false,
      favorite: false,
    });
    setEmptyFiltre(false);
    setLikeChecked(false);
    setFavoriteChecked(false);

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
          //data.muscle ? data.muscle.map((group) => group.name) : []
          data.muscle ? data.muscle.map((group) => group) : []
        );
        setExerciseTypeOptions(
          //data.typology ? data.typology.map((typology) => typology) : []
          data.typology ? data.typology.map((typology) => typology) : []
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
      <CiFilter className="modal-button whiteFill" onClick={openModal}>
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
              {/* {muscleGroupOptions.map((muscleGroup, index) => (
                <option key={index} value={muscleGroup}>
                  {muscleGroup}
                </option>
              ))} */}
              {muscleGroupOptions.map((muscleGroup) => (
                <option key={muscleGroup.id} value={muscleGroup.id}>
                  {muscleGroup.name}
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
              {exerciseTypeOptions.map((exerciseType) => (
                <option key={exerciseType.id} value={exerciseType.id}>
                  {exerciseType.name}
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
          <span>
            <label htmlFor="like">Favoritos </label>
            <input
              className="like"
              id="like"
              type="checkbox"
              checked={favoriteChecked}
              onChange={() => {
                setFavoriteChecked(!favoriteChecked);
                handleFilterChange("favorite", !favoriteChecked);
              }}
            />
          </span>
          <span>
            <label>Likes</label>
            <input
              type="checkbox"
              checked={likeChecked}
              onChange={() => {
                setLikeChecked(!likeChecked);
                handleFilterChange("like", !likeChecked);
              }}
            />
          </span>
          <button onClick={handleApplyFilters}>
            {emptyFilter ? "Aplicar Filtros" : "Mostrar todo"}
          </button>
          {/* {selectedFilters ? (
            <button onClick={handleDeleteFilters}>Eliminar Filtros</button>
          ) : (
            ""
          )} */}
          <button onClick={closeModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalButton;
