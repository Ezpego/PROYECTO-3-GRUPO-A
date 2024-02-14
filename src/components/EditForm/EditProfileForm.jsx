import style from "./EditProfileForm.module.css";

import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../context/TokenContext";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

const EditProfileForm = ({ onUpdateProfile, onCancelEditProfile, errors }) => {
    // const {user, updateUser} = useContext(UserContext);
    const { token, userData, updateUser } = useContext(TokenContext);
    const [showEmail, setShowEmail] = useState(false);
    const [emailFromServer, setEmailFromServer] = useState("");
    const [formErrors, setFormErrors] = useState(errors);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
        useState(false);
    const [editedData, setEditedData] = useState({
        name: userData?.name || "",
        last_name: userData?.last_name || "",
        dni: userData?.dni || "",
        birth_date: userData?.birth_date || "",
        email: "",
        password: userData?.password || "",
        phone_number: userData?.phone_number || "",
        photo: userData?.profile_image_url || "",
    });

    useEffect(() => {
        setFormErrors(errors);

        if (errors) {
            setEditedData({
                name: editedData.name || "",
                last_name: editedData.last_name || "",
                dni: editedData.dni || "",
                birth_date: editedData.birth_date || "",
                email: "",
                password: "",
                phone_number: editedData.phone_number || "",
                photo: editedData.profile_image_url || "",
            });
        } else {
            // ECHAR UN OJO AL WARNING QUE PONE EN LA LINEA 55
            setEditedData({
                name: userData?.name || "",
                last_name: userData?.last_name || "",
                dni: userData?.dni || "",
                birth_date: userData?.birth_date || "",
                email: "",
                password: "",
                phone_number: userData?.phone_number || "",
                photo: userData?.profile_image_url || "",
            });
        }
    }, [userData, errors]);

    const userId = userData.id;
    const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;

    console.log("ErRORS:", errors);
    console.log("FORMERRORS:", formErrors);

    const openChangePasswordModal = () => {
        setIsChangePasswordModalOpen(true);
    };

    const closeChangePasswordModal = () => {
        setIsChangePasswordModalOpen(false);
    };

    function formatDate(dateString) {
        const date = dateString ? new Date(dateString) : new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const showInputEmail = async () => {
        console.log("TOKEN DEL EDITFORMPRF:", token);
        try {
            const response = await fetch(`${urlRaiz}/users/data`, {
                method: "GET",
                headers: {
                    authorization: `${token}`,
                },
            });

            if (response.ok) {
                const { email } = await response.json();
                setEmailFromServer(email);
            } else {
                console.error(
                    "Error al obtener el correo electrónico del servidor"
                );
            }
        } catch (error) {
            console.error(
                "Error de red al obtener el correo electrónico",
                error
            );
        }
        setShowEmail(!showEmail);
    };

    const handleChange = (e) => {
        if (e.target.name === "photo") {
            const file = e.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null);
            }

            setSelectedFile(file);
        } else {
            setEditedData({
                ...editedData,
                [e.target.name]: e.target.value === "" ? " " : e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formattedDate = "";
        if (editedData.birth_date) {
            const dateObj = new Date(editedData.birth_date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");

            formattedDate = `${year}-${month}-${day}`;
        }
        const formData = new FormData();
        formData.append("name", editedData.name);
        formData.append("last_name", editedData.last_name);
        formData.append("dni", editedData.dni);
        formData.append("birth_date", formattedDate);
        formData.append("email", editedData.email.trim());
        formData.append("password", editedData.password.trim());
        formData.append("phone_number", editedData.phone_number);
        formData.append("photo", selectedFile);

        try {
            await onUpdateProfile(userId, formData);
            const updatedUserDataResponse = await fetch(
                `${urlRaiz}/users/data`,
                {
                    method: "GET",
                    headers: {
                        authorization: `${token}`,
                    },
                }
            );

            if (updatedUserDataResponse.ok) {
                const updatedUserData = await updatedUserDataResponse.json();

                updateUser({
                    name: updatedUserData.name,
                    last_name: updatedUserData.last_name,
                    dni: updatedUserData.dni,
                    birth_date: updatedUserData.birth_date,
                    email: updatedUserData.email,
                    password: updatedUserData.password,
                    phone_number: updatedUserData.phone_number,
                    profile_image_url: updatedUserData.profile_image_url
                        ? `${
                              updatedUserData.profile_image_url
                          }?timestamp=${Date.now()}`
                        : null,
                });
                console.log("FECHA NACIMIENTOOO", updatedUserData.birth_date);
            } else {
                console.error(
                    "Error al obtener datos actualizados del usuario"
                );
            }
        } catch (error) {
            console.error("Error en la función handleSubmit:", error);
        }
    };

    const handleRemoveProfilePhoto = async () => {
        try {
            const response = await fetch(
                `${urlRaiz}/users/${userId}/deleteProfilePhoto`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            if (response) {
                console.log("Profile photo deleted successfully");
                updateUser({
                    ...userData,
                    profile_image_url: null,
                });
            } else {
                console.error("Error deleting profile photo:", response.status);
            }
        } catch (error) {
            console.error(
                "Error en la función handleRemoveProfilePhoto:",
                error
            );
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={style.form}>
                <label className={style.label}>
                    Nombre:
                    <input
                        autoComplete="off"
                        className={style.input}
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className={style.label}>
                    Apellido:
                    <input
                        autoComplete="off"
                        className={style.input}
                        type="text"
                        name="last_name"
                        value={editedData.last_name}
                        onChange={handleChange}
                    />
                </label>

                <label className={style.label}>
                    DNI:
                    <input
                        autoComplete="off"
                        className={style.input}
                        type="text"
                        name="dni"
                        value={editedData.dni}
                        onChange={handleChange}
                    />
                </label>

                <label className={style.label}>
                    Fecha de Nacimiento:&nbsp;
                    <span className="stored-date">
                        {formatDate(editedData.birth_date)}
                    </span>
                    <input
                        className={style.input}
                        type="date"
                        name="birth_date"
                        value={editedData.birth_date}
                        onChange={handleChange}
                    />
                </label>

                <label className={style.label}>
                    Email:
                    <button
                        className={style.buttonMail}
                        type="button"
                        onClick={showInputEmail}
                    >
                        {showEmail ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                    {showEmail && (
                        <div className="display-email">{emailFromServer}</div>
                    )}
                    {formErrors && formErrors.includes("Email") && (
                        <div className={style.error}>{formErrors}</div>
                    )}
                    <input
                        className={style.input}
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>

                <div className={style.labelContainer}>
                    {/* <label className={style.label}>Contraseña:</label> */}
                    <button
                        type="button"
                        className={style.buttonPassword}
                        onClick={openChangePasswordModal}
                    >
                        Cambiar Contraseña
                    </button>
                    {formErrors && formErrors.includes("Password") && (
                        <div className={style.error}>{formErrors}</div>
                    )}
                </div>

                <label className={style.label}>
                    Número de Teléfono:
                    <input
                        className={style.input}
                        type="text"
                        name="phone_number"
                        value={editedData.phone_number}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>

                <label className={style.label}>
                    Imagen de Perfil:
                    <input
                        className={style.input}
                        type="file"
                        accept="image/*"
                        name="photo"
                        onChange={handleChange}
                    />
                </label>
                <button
                    className={style.EliminarFoto}
                    type="button"
                    onClick={handleRemoveProfilePhoto}
                >
                    Eliminar Foto de Perfil
                </button>
                {previewImage && (
                    <img
                        className={style.imgForm}
                        src={previewImage}
                        alt="Preview"
                    />
                )}

                <button className={style.guardarCambios} type="submit">
                    Guardar Cambios
                </button>
                <button className={style.Volver} onClick={onCancelEditProfile}>
                    Salir
                </button>
            </form>

            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onClose={closeChangePasswordModal}
            />
        </>
    );
};

EditProfileForm.propTypes = {
    userData: PropTypes.shape({
        name: PropTypes.string,
        last_name: PropTypes.string,
        dni: PropTypes.string,
        birth_date: PropTypes.string,
        email: PropTypes.string,
        phone_number: PropTypes.string,
        profile_image_url: PropTypes.string,
    }),
    onLogout: PropTypes.func,
    onUpdateProfile: PropTypes.func,
    onEditProfileClick: PropTypes.func,
    onCancelEditProfile: PropTypes.func,
    errors: PropTypes.string,
};

export default EditProfileForm;
