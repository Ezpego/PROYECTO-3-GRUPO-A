import { FiBookmark } from "react-icons/fi";
import "./ButtonsFavourite.css";
import { useContext } from "react";
import TokenContext from "../../../context/TokenContext";
import { receiveExerciseList } from "../../../utils/consultasServidor";

const ButtonsFavourite = ({
  id,
  setFillFavouriteButton,
  fillFavouriteButton,
}) => {
  const { token } = useContext(TokenContext);
  const handleToggleFavourite = () => {
    console.log("este es el id del boton pulsado", id);

    const urlRuta = `/exercises/${id}/favourites`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: null,
    };
    const getFavourites = async () => {
      const favouriteStatus = await receiveExerciseList(urlRuta, options);
      console.log("respuesta peticion", favouriteStatus);
    };

    getFavourites();

    if (fillFavouriteButton.includes(Number(id))) {
      const newFillFavouriteButton = fillFavouriteButton.filter(
        (item) => item !== Number(id)
      );
      setFillFavouriteButton(newFillFavouriteButton);
      console.log("favoriot eliminado de la lista", id, newFillFavouriteButton);
    } else {
      const newFillFavouriteButton = [...fillFavouriteButton, Number(id)];
      console.log("favorito añadido a la lista", newFillFavouriteButton),
        setFillFavouriteButton(newFillFavouriteButton);
    }
  };
  // Test boton Fav

  return (
    <>
      <FiBookmark
        id={id}
        className={fillFavouriteButton.includes(id) ? "redFill" : ""}
        onClick={handleToggleFavourite}
      />
    </>
  );
};
export default ButtonsFavourite;