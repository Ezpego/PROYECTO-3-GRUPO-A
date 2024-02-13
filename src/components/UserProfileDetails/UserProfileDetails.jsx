import { useContext } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../context/TokenContext";
import { RxAvatar } from "react-icons/rx";
import style from "./UserProfileDetails.module.css";

const UserProfileDetails = ({ onEditProfileClick }) => {
    const { userData } = useContext(TokenContext);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <section className={style.userProfileCard}>
            {userData && userData.profile_image_url ? (
                <img
                    className={style.profileImage}
                    key={userData.profile_image_url}
                    src={userData.profile_image_url}
                    alt="Profile"
                />
            ) : (
                <RxAvatar className={style.profileImage} />
            )}

            <article className="userData-details">
                <h2 className={style.h2}>Detalles del Perfil</h2>
                <dl className={style.dl}>
                    <dt className={style.dt}>
                        <strong>Nombre</strong>
                    </dt>
                    <dd className={style.dd}>{userData.name}</dd>

                    <dt className={style.dt}>
                        <strong>Apellidos</strong>
                    </dt>
                    <dd className={style.dd}>{userData.last_name}</dd>

                    <dt className={style.dt}>
                        <strong>DNI</strong>
                    </dt>
                    <dd className={style.dd}>{userData.dni}</dd>

                    <dt className={style.dt}>
                        <strong>Fecha de Nacimiento</strong>
                    </dt>
                    <dd className={style.dd}>
                        {userData.birth_date
                            ? formatDate(userData.birth_date)
                            : null}
                    </dd>

                    <dt className={style.dt}>
                        <strong>Email</strong>
                    </dt>
                    <dd className={style.dd}>{userData.email}</dd>

                    <dt className={style.dt}>
                        <strong>Número de Teléfono</strong>
                    </dt>
                    <dd className={style.dd}>{userData.phone_number}</dd>
                </dl>
            </article>
            <button className={style.button} onClick={onEditProfileClick}>
                Editar Perfil
            </button>
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
