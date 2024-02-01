import { useContext, useEffect, useState } from "react";
import TokenContext from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ButtonsFavourite from "../Buttons/ButtonsFavourite/ButtonsFavourite";
import ButtonsLike from "../Buttons/ButtonsLike/ButtonsLike";
import ButtonsDelete from "../Buttons/ButtonsDelete/ButtonsDelete";
import ButtonsEdit from "../Buttons/ButtonsEdit/ButtonsEdit";

const ExerciseCard = ({
  id,
  name,
  image_url,
  description,
  numberLikes,
  likesUser,
  favouriteUser,
  typologyType,
  muscleType,
  exercises,
  setExercises,
  difficulty_level,
  muscleGroupArray,
  typologyArray,
}) => {
  const [seeMoreButton, setSeeMoreButton] = useState(true);
  const [fillFavouriteButton, setFillFavouriteButton] = useState(favouriteUser);
  const [fillLikeButton, setFillLikeButton] = useState(likesUser);
  const [updatedNumberLike, setUpdatedNumberLike] = useState(numberLikes);
  const [musclename, setMuscleName] = useState();
  const [typologyname, setTypologyName] = useState();
  const navigate = useNavigate();
  const { token, setToken, tokenUpdate, userData, isAdmin } =
    useContext(TokenContext);

  const exerciseObj = {
    id: id,
    name: name,
    description: description,
    difficulty_level: difficulty_level,
    muscle_group: muscleType,
    typology: typologyType,
    photo: image_url,
    typology_name:
      typologyArray.find((typology) => Number(typology.id) === id)?.name || "",
    muscle_group_name:
      muscleGroupArray.find((muscle) => Number(muscle.id) === id)?.name || "",
  };

  const handleSeeMoreButton = () => {
    setSeeMoreButton(!seeMoreButton);
  };

  useEffect(() => {
    console.log(`Músculo: ${exerciseObj.muscle_group_name}`);
    console.log(`Tipología: ${exerciseObj.typology_name}`);
  }, []);
  useEffect(() => {
    const nameselectiontipes = async () => {
      const muscle = muscleGroupArray.find(
        (muscle) => Number(muscle.id) === id
      );
      const typology = typologyArray.find(
        (typology) => Number(typology.id) === id
      );

      const tempMuscleName = muscle ? [muscle.name] : [];
      const tempTypologyName = typology ? [typology.name] : [];

      console.log(`Músculo: ${tempMuscleName}`);
      console.log(`Tipología: ${tempTypologyName}`);

      setMuscleName(tempMuscleName);
      setTypologyName(tempTypologyName);
    };

    nameselectiontipes();
  }, [muscleGroupArray, typologyArray, id]);

  return (
    <>
      <div className="cardContainer exersiseCard">
        <p>-----------------------------------------</p>
        <img
          src={image_url}
          className="exersiseCard"
          alt="imagen ejercicio"
          width={100}
        />
        <h5 className="exersiseCard">{name}</h5>
        <p>Dificultad: {`${difficulty_level}`}</p>

        <p>
          Grupo Muscular:{" "}
          {exerciseObj.muscle_group_name
            ? `${exerciseObj.muscle_group_name}`
            : `no especificado`}
        </p>

        <p>
          Tipologia:{" "}
          {exerciseObj.typology_name
            ? `${exerciseObj.typology_name}`
            : `no especificado`}
        </p>
        <span>
          <ButtonsLike
            id={id}
            fillLikeButton={fillLikeButton}
            setFillLikeButton={setFillLikeButton}
            updatedNumberLike={updatedNumberLike}
            setUpdatedNumberLike={setUpdatedNumberLike}
          />
          <span>{`  ${updatedNumberLike} ${
            updatedNumberLike < 2 ? "like " : "Likes "
          }`}</span>
        </span>
        <ButtonsFavourite
          id={id}
          fillFavouriteButton={fillFavouriteButton}
          setFillFavouriteButton={setFillFavouriteButton}
        />
        {seeMoreButton ? (
          <span>
            <SlArrowDown
              className="exersiseCard"
              onClick={handleSeeMoreButton}
            />
            <span> Ver Mas</span>
          </span>
        ) : (
          <span>
            <SlArrowUp className="exersiseCard" onClick={handleSeeMoreButton} />
            <span> Ver Menos</span>
          </span>
        )}
        {!seeMoreButton && <span>{}</span>}
        {!seeMoreButton && <p>{description}</p>}
        {isAdmin && (
          <div>
            <ButtonsEdit exerciseObj={exerciseObj} />
            <ButtonsDelete
              id={id}
              setExercises={setExercises}
              exercises={exercises}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ExerciseCard;
