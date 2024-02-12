import { useLocation } from "react-router-dom";
import FormExercises from "../components/ExercisesForm/ExercisesFormCreated";
import UserGestion from "../components/UserGestion/UserGestion";
import { useState } from "react";

const AdminPage = () => {
  const { state } = useLocation();
  console.log(state);
  const [currentComponent, setCurrentComponent] = useState(null);

  const buttonStyle = {
    border: "1px solid #ccc",
    padding: "20px 20px",
    borderRadius: "15px",
    cursor: "pointer",
    margin: "20px",
  };

  return (
    <>
      {currentComponent === "FormExercises" && <FormExercises />}
      {currentComponent === "UserGestion" && (
        <UserGestion setCurrentComponent={setCurrentComponent} />
      )}

      {!currentComponent && (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ textAlign: "center", fontSize: "1.5em" }}>Admin Page</h1>
          <button
            style={buttonStyle}
            onClick={() => setCurrentComponent("FormExercises")}
          >
            Formulario nuevo ejercicio
          </button>

          <button
            style={buttonStyle}
            onClick={() => setCurrentComponent("UserGestion")}
          >
            Gestión de usuarios
          </button>
        </div>
      )}
    </>
  );
};

export default AdminPage;
