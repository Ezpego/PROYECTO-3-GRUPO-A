import { receiveExerciseList } from "../../utils/consultasServidor";
import { useContext, useEffect, useState } from "react";
import TokenContext from "../../context/TokenContext";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [likesUser, setLikesUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [favouriteUser, setFavouriteUser] = useState({});
  const [typologyarray, setTypologyArray] = useState([]);
  const [muscleGroupArray, setMuscleGroupArray] = useState([]);
  const { token, setToken, tokenUpdate, userData, isAdmin } =
    useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercisesResponse = await receiveExerciseList(
          "/exercises",
          options
        );
        const likesResponse = await receiveExerciseList("/filter", options);
        const favouritesResponse = await receiveExerciseList(
          "/favourites",
          options
        );
        console.log(likesResponse);
        setExercises(exercisesResponse);
        const likeID = likesResponse.likes.map((like) => like.id);
        console.log("Likes a pintar", likeID);
        setLikesUser(likeID);
        setTypologyArray(likesResponse.typology);
        setMuscleGroupArray(likesResponse.muscle);
        const favID = favouritesResponse.map(
          (favourite) => favourite.exercise_id
        );
        console.log("Favs a pintar", favID);
        setFavouriteUser(favID);

        setIsLoaded(true);
      } catch (error) {
        console.error("Error al cargar datos: ", error);
        setIsLoaded(false);
      }
    };

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: null,
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    console.log("likes del usuario a pintar", likesUser);
    console.log("Favs del usuario descargados", favouriteUser);
    console.log("exercises", exercises);
  }, [likesUser, favouriteUser]);

  return (
    <>
      <p>ejercicios List</p>

      {isLoaded ? (
        exercises.map((exercise) => (
          // {const pruebanamemuscle = muscleGroupArray.filter((muscle) => muscle.id === id)}

          <ExerciseCard
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            image_url={exercise.image_url}
            description={exercise.description}
            numberLikes={exercise.like_count}
            likesUser={likesUser}
            muscleType={exercise.muscle_group_id}
            typologyType={exercise.typology_id}
            favouriteUser={favouriteUser}
            difficulty_level={exercise.difficulty_level}
            exercises={exercises}
            setExercises={setExercises}
            typologyArray={typologyarray}
            muscleGroupArray={muscleGroupArray}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default ExercisesList;
