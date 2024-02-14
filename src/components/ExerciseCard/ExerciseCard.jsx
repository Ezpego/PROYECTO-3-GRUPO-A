import { useContext, useEffect, useState } from "react";
import TokenContext from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ButtonsFavourite from "../Buttons/ButtonsFavourite/ButtonsFavourite";
import ButtonsLike from "../Buttons/ButtonsLike/ButtonsLike";
import ButtonsDelete from "../Buttons/ButtonsDelete/ButtonsDelete";
import ButtonsEdit from "../Buttons/ButtonsEdit/ButtonsEdit";
import "./ExerciseCard.css";

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
  console.log("este es el typologyArray", typologyArray);
  console.log("este el el muscleGroupArray", muscleGroupArray);
  const exerciseObj = {
    id: id,
    name: name,
    description: description,
    difficulty_level: difficulty_level,
    muscle_group: muscleType,
    typology: typologyType,
    photo: image_url,
    typology_name:
      typologyArray.find((typology) => Number(typology.id) === typologyType)
        ?.name || "",
    muscle_group_name:
      muscleGroupArray.find((muscle) => Number(muscle.id) === muscleType)
        ?.name || "",
  };

  console.log("objeto", exerciseObj);
  const handleSeeMoreButton = () => {
    setSeeMoreButton(!seeMoreButton);
  };

  return (
    <div className="exercise-cards-container">
      <img
        src={image_url}
        className="exerciseCardImage div1"
        alt="imagen ejercicio"
      />
      <h4 className="exersiseCardTitle grid-item div2">&nbsp;{name}</h4>
      <p className="exersiseCardDifficulty div3">
        &nbsp;<strong>Dificultad: </strong>
        {`${difficulty_level}`}
      </p>
      <p className="exersiseCardGroupMuscle grid-item div5">
        &nbsp;<strong>G.Muscular:</strong>&nbsp;
        {exerciseObj.muscle_group_name
          ? `${exerciseObj.muscle_group_name}`
          : `no especificado`}
      </p>
      <p className="exersiseCardTypology grid-item div6">
        &nbsp;<strong>Tipologia:</strong>&nbsp;
        {exerciseObj.typology_name
          ? `${exerciseObj.typology_name} `
          : `no especificado`}
      </p>
      <div className="exersiseCardButtonsSocial grid-item div4">
        <ButtonsFavourite
          id={id}
          fillFavouriteButton={fillFavouriteButton}
          setFillFavouriteButton={setFillFavouriteButton}
        />
        &nbsp; &nbsp;
        <ButtonsLike
          id={id}
          fillLikeButton={fillLikeButton}
          setFillLikeButton={setFillLikeButton}
          updatedNumberLike={updatedNumberLike}
          setUpdatedNumberLike={setUpdatedNumberLike}
        />
        &nbsp;
        <span> {`${updatedNumberLike}`}</span>
        &nbsp;
      </div>
      {isAdmin && (
        <div className="exerciseCardButtonsAdmin grid-item div8">
          <ButtonsEdit exerciseObj={exerciseObj} />
          &nbsp;&nbsp;
          <ButtonsDelete
            id={id}
            setExercises={setExercises}
            exercises={exercises}
          />
          &nbsp;
        </div>
      )}
      {seeMoreButton ? (
        <span className="exerciseCardButtonsMore grid-item div7">
          &nbsp;
          <SlArrowDown className="exersiseCard" onClick={handleSeeMoreButton} />
          &nbsp;<span onClick={handleSeeMoreButton}> Ver Mas </span>&nbsp;
        </span>
      ) : (
        <span className="exerciseCardButtonsMore grid-item div7">
          &nbsp;
          <SlArrowUp className="exersiseCard" onClick={handleSeeMoreButton} />
          &nbsp;<span onClick={handleSeeMoreButton}> Ver Menos </span>&nbsp;
        </span>
      )}
      &nbsp;
      {!seeMoreButton && (
        <p className="exerciseCardDescription grid-item div9">
          &nbsp;{description}&nbsp;
        </p>
      )}
    </div>
  );
};

export default ExerciseCard;
