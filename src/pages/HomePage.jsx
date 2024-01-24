import ExercisesList from "../components/ExercisesList/ExercisesList";
import LoginForm from "../components/LoginForm/LoginForm";
import TokenContext from "../context/TokenContext";
import { useContext } from "react";
import { RxExit } from "react-icons/rx";

const HomePage = () => {
  const { token, setToken, tokenUpdate, userData, isAdmin } =
    useContext(TokenContext);

  const handleExitButton = () => {
    tokenUpdate("");
  };
  return (
    <div>
      <header>
        <h1>GymJoy</h1>
      </header>
      <p>Página principal </p>
      {token ? <ExercisesList /> : <LoginForm />}
      <footer> {token && <RxExit onClick={handleExitButton} />}</footer>
    </div>
  );
};

export default HomePage;
