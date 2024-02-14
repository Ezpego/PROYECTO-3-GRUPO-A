import { receiveExerciseList } from "../../utils/consultasServidor";
import { useEffect, useState, useContext } from "react";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import TokenContext from "../../context/TokenContext";
import "./ExercisesList.css";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [likesUser, setLikesUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [favouriteUser, setFavouriteUser] = useState({});
  const [typologyarray, setTypologyArray] = useState([]);
  const [muscleGroupArray, setMuscleGroupArray] = useState([]);
  const { token, filterSelected } = useContext(TokenContext);

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
        const likeID = likesResponse.likes?.map((like) => like.id) || [];
        console.log("Likes a pintar", likeID);
        setLikesUser(likeID);
        setTypologyArray(likesResponse.typology);
        setMuscleGroupArray(likesResponse.muscle);
        const favID =
          favouritesResponse?.map((favourite) => favourite.exercise_id) || [];
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
    if (!filterSelected) {
      return;
    }
    setIsLoaded(false);
    const { muscleGroup, exerciseType, difficulty_level, like, favorite } =
      filterSelected;
    console.log(
      "estos son los datos que has selccionado del filtro",
      muscleGroup,
      exerciseType,
      difficulty_level,
      like,
      favorite
    );

    let urlExerciesFilter = "/exercises/";

    if (muscleGroup || exerciseType || difficulty_level) {
      urlExerciesFilter += "?";
      if (muscleGroup) {
        urlExerciesFilter += `muscle_group=${muscleGroup}&`;
      }
      if (exerciseType) {
        urlExerciesFilter += `typology=${exerciseType}&`;
      }
      if (difficulty_level) {
        urlExerciesFilter += `difficulty_level=${difficulty_level}&`;
      }
      if (urlExerciesFilter.endsWith("&")) {
        urlExerciesFilter = urlExerciesFilter.slice(0, -1);
      }
    }
    const handleFilterSelected = async () => {
      try {
        const exercisesResponse = await receiveExerciseList(
          `${urlExerciesFilter}`,
          options
        );
        const likesResponse = await receiveExerciseList("/filter", options);
        const favouritesResponse = await receiveExerciseList(
          "/favourites",
          options
        );
        console.log(likesResponse);

        const likeID = likesResponse.likes?.map((like) => like.id) || [];

        setLikesUser(likeID);

        const favID =
          favouritesResponse?.map((favourite) => favourite.exercise_id) || [];

        setFavouriteUser(favID);

        if (like && favorite) {
          if (favID.length > 0 && likeID.length > 0) {
            console.log("hay  coincidencia", favID, likeID, likeID.length);

            const idComunes = likeID.filter((like) => favID.includes(like));
            console.log("idcomunes", idComunes);

            const exerciseFilterList = exercisesResponse.filter((exercise) =>
              idComunes.includes(exercise.id)
            );
            console.log(exerciseFilterList);
            setIsLoaded(true);
            return setExercises(exerciseFilterList);
          } else {
            console.log("no hay coincidencias", favID, likeID, likeID.length);

            setIsLoaded(true);
            return setExercises([]);
          }
        } else if (like) {
          const exerciseFilterList = exercisesResponse.filter((exercise) =>
            likeID.includes(exercise.id)
          );

          setExercises(exerciseFilterList);
        } else if (favorite) {
          const exerciseFilterList = exercisesResponse.filter((exercise) =>
            favID.includes(exercise.id)
          );
          setExercises(exerciseFilterList);
        } else {
          setExercises(exercisesResponse);
        }
        console.log("ejercicios filtrados", exercises);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error al cargar datos filtrado: ", error);
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

    console.log("me he renderizado filtros seleccionados");
    handleFilterSelected();
  }, [filterSelected]);

  return (
    <>
      <div className="exercise-list-container">
        {isLoaded ? (
          exercises.length > 0 ? (
            exercises.map((exercise) => (
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
            <div className="notExercisesBox">
              <p className="notExercises">
                <strong>"OOPSS, No se han encontrado ejercicios..."</strong>
              </p>
            </div>
          )
        ) : (
          <div className="LoadingExercisesBox">
            <p className="loadingExercises">
              <strong>Loading...</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default ExercisesList;
