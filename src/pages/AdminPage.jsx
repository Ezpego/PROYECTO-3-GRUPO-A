// import { useLocation } from "react-router-dom";

// const AdminPage = () => {
//   const { state } = useLocation();
//   console.log(state);
//   return (
//     <>
//       <p>Admin Page </p>
//     </>
//   );
// };

// export default AdminPage;

import { useLocation } from "react-router-dom";
import FormExercises from "../components/ExercisesForm/ExercisesFormCreated";
import FormExercisesEditer from "../components/ExercisesForm/ExercisesFormEditer";
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
      {currentComponent === "UserGestion" && <UserGestion />}
      {currentComponent === "FormExercisesEditer" && <FormExercisesEditer />}

      {!currentComponent && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
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
          <button
            style={buttonStyle}
            onClick={() => setCurrentComponent("FormExercisesEditer")}
          >
            Edicion de ejercicios{" "}
          </button>
        </div>
      )}
    </>
  );
};

export default AdminPage;
