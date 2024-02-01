import { receiveExerciseList } from "../../utils/consultasServidor";
import { useContext, useEffect, useState } from "react";
import TokenContext from "../../context/TokenContext";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const { token, setToken, tokenUpdate, userData, isAdmin } =
    useContext(TokenContext);
  useEffect(() => {
    const urlRuta = "/exercises";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: null,
    };
    const getExercises = async () => {
      const arrayExercises = await receiveExerciseList(urlRuta, options);
      console.log(arrayExercises);
      setExercises(arrayExercises);
      console.log("ejercicios a pintar", exercises);
    };

    getExercises();
  }, []);

  return (
    <>
      <p>ejercicios List</p>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          id={exercise.id}
          name={exercise.name}
          image_url={exercise.image_url}
          description={exercise.description}
        />
      ))}
    </>
  );
};
export default ExercisesList;