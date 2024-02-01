import "./ExerciseCard.css";

import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";

import { useContext, useState } from "react";
import TokenContext from "../../context/TokenContext";
import { receiveExerciseList } from "../../utils/consultasServidor";

const ExerciseCard = ({ id, name, image_url, description }) => {
  const [seeMoreButton, setSeeMoreButton] = useState(false);
  const { token, setToken, tokenUpdate, userData, isAdmin } =
    useContext(TokenContext);
  const handleSeeMoreButton = () => {
    setSeeMoreButton(!seeMoreButton);
  };
  const handleToggleLike = (e) => {
    const urlRuta = `/exercises/${e.target.id}/likes`;
    console.log(e.target.id);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: null,
    };
    const getLikes = async () => {
      const likeStatus = await receiveExerciseList(urlRuta, options);
      //setExercises(arrayExercises);
      console.log("estado del like es", likeStatus);
    };

    getLikes();
  };
  return (
    <>
      <div className="cardContainer">
        <img src={image_url} alt="imagen ejercicio" width={100}></img>
        <h5>{name}</h5>
        <span>
          <FiHeart id={id} onClick={handleToggleLike} />
          <span>{`  ${id} Likes`}</span>
        </span>
        <CiBookmark />
        {seeMoreButton ? (
          <span>
            {" "}
            <SlArrowDown onClick={handleSeeMoreButton} />
            <span>Ver Mas</span>
          </span>
        ) : (
          <span>
            {" "}
            <SlArrowUp onClick={handleSeeMoreButton} />
            <span>Ver Menos</span>
          </span>
        )}

        {!seeMoreButton && <p>{description}</p>}
        {isAdmin && (
          <div>
            <LuPencil />
            <RiDeleteBin6Line />
          </div>
        )}
      </div>
    </>
  );
};
export default ExerciseCard;