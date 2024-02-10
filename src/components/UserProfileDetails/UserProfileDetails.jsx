import { useContext } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../context/TokenContext";
import { RxAvatar } from "react-icons/rx";
import "./UserProfileDetails.css";

const UserProfileDetails = ({ onEditProfileClick }) => {
    const { userData } = useContext(TokenContext);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <section className="user-profile-card">
            <article className="profile-image-container">
                {userData && userData.profile_image_url ? (
            <img
            key={userData.profile_image_url}
            src={userData.profile_image_url}
            alt="Profile"
            className="profile-image"
/>
        ) : (
            <RxAvatar className="profile-image" />
        )}

            </article>
            <article className="userData-details">
                <h2>Detalles del Perfil</h2>
                <dl>
                    <dt><strong>Nombre</strong></dt>
                    <dd>{userData.name}</dd>

                    <dt><strong>Apellidos</strong></dt>
                    <dd>{userData.last_name}</dd>

                    <dt><strong>DNI</strong></dt>
                    <dd>{userData.dni}</dd>

                    <dt><strong>Fecha de Nacimiento</strong></dt>
                    <dd>{userData.birth_date
                        ? formatDate(userData.birth_date)
                        : null}</dd>

                    <dt><strong>Email</strong></dt>
                    <dd>{userData.email}</dd>

                    <dt><strong>Número de Teléfono</strong></dt>
                    <dd>{userData.phone_number}</dd>

                </dl>
            </article>
            <button onClick={onEditProfileClick}>Editar Perfil</button>
        </section>
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
