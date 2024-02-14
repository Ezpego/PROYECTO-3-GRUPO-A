import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import style from "./UserGestion.module.css";
import DeleteUserButton from "../Buttons/DeleteUserButton/DeleteUserButton";

const UserGestion = ({ setCurrentComponent }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { token } = useContext(TokenContext);
    const [useData, setUseData] = useState(null);
    const [useMail, setUseMail] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setUseMail(event.target.value);
    };

    const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;

    let formattedDate = "";

    const handleSearchClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${urlRaiz}/users/${useMail}`, {
                method: "GET",
                headers: { authorization: `${token}` },
            });

            const result = await response.json();
            console.log(result);
            if (!response.ok) {
                throw new Error(result);
            }
            if (result.birth_date) {
                const dateObj = new Date(result.birth_date);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                const day = String(dateObj.getDate()).padStart(2, "0");

                formattedDate = `${year}-${month}-${day}`;
                result.birth_date = formattedDate;
            }

            Object.keys(result).forEach((key) => {
                result[key] =
                    result[key] === null || result[key] === "null"
                        ? " "
                        : result[key];
            });

            const finalResult = { ...result };

            reset(finalResult);

            // Establecer los datos del usuario en el estado
            setUseData(result);

            if (result.profile_image_url !== " ") {
                setPreviewSrc(result.profile_image_url);
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data) => {
        console.log("Datos: ", data);
        // console.log(data.photo[0]);
        console.log("hola");

        const formDataToSend = new FormData();
        if (data.profile_image_url && data.profile_image_url.length > 0) {
            formDataToSend.append("photo", imageFile);
        }
        if (data.birth_date && data.birth_date.length > 0) {
            formDataToSend.append("birth_date", data.birth_date);
        }

        Object.entries(data).forEach(([key, value]) => {
            if (key !== "photo" && key !== "birth_date") {
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await fetch(
                `${urlRaiz}/userGestion/${data.id}/editProfile`,
                {
                    method: "PATCH",
                    headers: { authorization: `${token}` },
                    body: formDataToSend,
                }
            );

            const result = await response.json();

            console.log(result);
            setPreviewSrc();
            setCurrentComponent(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!useData ? (
                <div className={style.userGestionContainer}>
                    <div className={style.userGestionForm}>
                        <form
                            className={style.estructura}
                            onSubmit={handleSearchClick}
                        >
                            <input
                                autoComplete="off"
                                className={style.inputBuscador}
                                type="text"
                                placeholder="Email usuario"
                                onChange={handleInputChange}
                            />
                            <FaSearch
                                className={style.lupa}
                                onClick={handleSearchClick}
                            />
                        </form>
                        {error && (
                            <p className={style.error}>
                                El usuario no existe en la base de datos
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className={style.userGestionContainer}>
                    <div className={style.userGestionForm}>
                        <form
                            className={style.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label className={style.label}>
                                Nombre
                                <input
                                    className={style.input}
                                    type="text"
                                    {...register("name", { required: true })}
                                    maxLength={30}
                                    autoComplete="off"
                                />
                            </label>
                            {errors.name && (
                                <span className={style.error}>
                                    Este campo es obligatorio
                                </span>
                            )}

                            <label className={style.label}>
                                Apellido
                                <input
                                    className={style.input}
                                    type="text"
                                    {...register("last_name")}
                                    maxLength={50}
                                    autoComplete="off"
                                />
                            </label>

                            <label className={style.label}>
                                DNI
                                <input
                                    className={style.input}
                                    type="text"
                                    {...register("dni")}
                                    maxLength={20}
                                    autoComplete="off"
                                />
                            </label>

                            <label className={style.label}>
                                Fecha de Nacimiento
                                <input
                                    className={style.input}
                                    type="date"
                                    {...register("birth_date")}
                                />
                            </label>

                            <label className={style.label}>
                                Número de Teléfono
                                <input
                                    className={style.input}
                                    type="tel"
                                    {...register("phone_number")}
                                    maxLength={20}
                                    autoComplete="off"
                                />
                            </label>

                            <label className={style.label}>
                                Email
                                <input
                                    className={style.input}
                                    type="email"
                                    {...register("email", { required: true })}
                                    maxLength={50}
                                    autoComplete="off"
                                />
                            </label>
                            {errors.email && (
                                <span className={style.error}>
                                    Este campo es obligatorio
                                </span>
                            )}

                            <label className={style.label}>
                                Imagen de Perfil
                                <input
                                    className={style.input}
                                    type="file"
                                    {...register("profile_image_url", {
                                        required: false,
                                    })}
                                    onChange={handleImageChange}
                                />
                            </label>
                            {previewSrc && (
                                <img
                                    className={style.imgForm}
                                    src={previewSrc}
                                    alt="preview"
                                />
                            )}
                            {useData.isEnabled === 1 ? (
                                <label className={style.label}>
                                    Habilitado
                                    <input
                                        className={style.input}
                                        type="checkbox"
                                        {...register("isEnabled")}
                                    />
                                </label>
                            ) : (
                                <p className={style.error}>
                                    Usuario deshabilitado
                                </p>
                            )}

                            <label className={style.label}>
                                Administrador
                                <input
                                    className={style.input}
                                    type="checkbox"
                                    {...register("isAdministrator")}
                                />
                            </label>
                            {useData.isEnabled === 1 ? (
                                <button className={style.Enviar} type="submit">
                                    Editar
                                </button>
                            ) : (
                                <p className={style.error}>
                                    Para editar, debe reactivar el usuario
                                </p>
                            )}

                            <button
                                className={style.Volver}
                                onClick={() => setCurrentComponent(null)}
                            >
                                Volver
                            </button>
                        </form>
                        <DeleteUserButton id={useData.id} />
                    </div>
                </div>
            )}
        </>
    );
};

export default UserGestion;
