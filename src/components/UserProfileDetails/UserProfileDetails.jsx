import { useContext } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../context/TokenContext";

const UserProfileDetails = ({ onEditProfileClick }) => {
  const { userData } = useContext(TokenContext);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-profile-card">
      <div className="profile-image-container">
        <img
          className="profile-image"
          src={userData.profile_image_url}
          alt="Perfil"
        />
      </div>
      <div className="userData-details">
        <h2>Detalles del Perfil</h2>
        <div>
          <strong>Nombre:</strong> {userData.name}
        </div>
        <div>
          <strong>Apellido:</strong> {userData.last_name}
        </div>
        <div>
          <strong>DNI:</strong> {userData.dni}
        </div>
        <div>
          <strong>Fecha de Nacimiento:</strong>{" "}
          {userData.birth_date ? formatDate(userData.birth_date) : null}
        </div>
        <div>
          <strong>Email:</strong> {userData.email}
        </div>
        <div>
          <strong>Número de Teléfono:</strong> {userData.phone_number}
        </div>
      </div>
      <button onClick={onEditProfileClick}>Editar Perfil</button>
    </div>
  );
};

UserProfileDetails.propTypes = {
  onEditProfileClick: PropTypes.func,
  onUpdateProfile: PropTypes.func,
  errors: PropTypes.string,
  userData: PropTypes.shape({
    name: PropTypes.string,
    last_name: PropTypes.string,
    dni: PropTypes.string,
    birth_date: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    profile_image_url: PropTypes.string,
  }),
};

export default UserProfileDetails;
