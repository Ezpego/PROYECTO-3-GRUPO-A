import { FiHeart } from "react-icons/fi";
import { receiveExerciseList } from "../../../utils/consultasServidor";
import { useContext } from "react";
import TokenContext from "../../../context/TokenContext";
const ButtonsLike = ({
  id,
  fillLikeButton,
  setFillLikeButton,
  updatedNumberLike,
  setUpdatedNumberLike,
}) => {
  const { token } = useContext(TokenContext);
  const handleToggleLike = (e) => {
    console.log(e);
    const urlRuta = `/exercises/${id}/likes`;
    console.log(e);
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

      console.log("estado del like es", likeStatus);
    };

    getLikes();

    if (fillLikeButton.includes(Number(id))) {
      const newFillLikeButton = fillLikeButton.filter(
        (item) => item !== Number(id)
      );
      setFillLikeButton(newFillLikeButton);
      setUpdatedNumberLike(updatedNumberLike - 1);
      console.log(updatedNumberLike);
      console.log("favoriot eliminado de la lista", e, newFillLikeButton);
    } else {
      const newFillLikeButton = [...fillLikeButton, Number(id)];
      console.log("favorito añadido a la lista", newFillLikeButton),
        setFillLikeButton(newFillLikeButton);
      setUpdatedNumberLike(updatedNumberLike + 1);
      console.log(updatedNumberLike);
    }
  };
  return (
    <>
      <FiHeart
        id={id}
        onClick={handleToggleLike}
        className={fillLikeButton.includes(id) ? "redFill" : ""}
      />
    </>
  );
};

export default ButtonsLike;