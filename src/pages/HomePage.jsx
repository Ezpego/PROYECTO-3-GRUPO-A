import ExercisesList from "../components/ExercisesList/ExercisesList";
import LoginForm from "../components/LoginForm/LoginForm";
import TokenContext from "../context/TokenContext";
import { useContext } from "react";

const HomePage = () => {
    const { token, setToken, tokenUpdate, userData, isAdmin } =
        useContext(TokenContext);

    return <>{token ? <ExercisesList /> : <LoginForm />}</>;
};

export default HomePage;
