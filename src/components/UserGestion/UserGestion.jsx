import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./UserGestion.css";
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
    const [previewSrc, setPreviewSrc] = useState("");
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
            setPreviewSrc(result.profile_image_url);
        } catch (error) {
            console.error(error);
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
            formDataToSend.append("photo", data.profile_image_url[0]);
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
                `${urlRaiz}/user/${data.id}/editProfile`,
                {
                    method: "PATCH",
                    headers: { authorization: `${data.current_token}` },
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

    const onError = (error) => {
        console.error(error);
    };

    return (
        <>
            {!useData ? (
                <form className="estructura" onSubmit={handleSearchClick}>
                    <input
                        type="text"
                        placeholder="Email usuario"
                        onChange={handleInputChange}
                    />
                    <FaSearch className="lupa" onClick={handleSearchClick} />
                </form>
            ) : (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            Nombre
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                maxLength={30}
                            />
                        </label>
                        {errors.name && (
                            <span
                                style={{
                                    color: "red",
                                    fontSize: "0.8em",
                                    marginRight: "5px",
                                }}
                            >
                                Este campo es obligatorio
                            </span>
                        )}

                        <label>
                            Apellido
                            <input
                                type="text"
                                {...register("last_name")}
                                maxLength={50}
                            />
                        </label>

                        <label>
                            DNI
                            <input
                                type="text"
                                {...register("dni")}
                                maxLength={20}
                            />
                        </label>

                        <label>
                            Fecha de Nacimiento
                            <input type="date" {...register("birth_date")} />
                        </label>

                        <label>
                            Número de Teléfono
                            <input
                                type="tel"
                                {...register("phone_number")}
                                maxLength={20}
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                maxLength={50}
                            />
                        </label>
                        {errors.email && (
                            <span
                                style={{
                                    color: "red",
                                    fontSize: "0.8em",
                                    marginRight: "5px",
                                }}
                            >
                                Este campo es obligatorio
                            </span>
                        )}

                        <label>
                            Imagen de Perfil
                            <input
                                type="file"
                                {...register("profile_image_url", {
                                    required: false,
                                })}
                                onChange={handleImageChange}
                            />
                        </label>
                        {previewSrc && (
                            <img
                                src={previewSrc}
                                alt="preview"
                                width={"200px"}
                            />
                        )}

                        <label>
                            Habilitado
                            <input
                                type="checkbox"
                                {...register("isEnabled")}
                                defaultChecked
                            />
                        </label>

                        <label>
                            Administrador
                            <input
                                type="checkbox"
                                {...register("isAdministrator")}
                            />
                        </label>

                        <button type="submit">Editar</button>
                        <button
                            onClick={() => setCurrentComponent(null)}
                            style={{ color: "red", marginLeft: "50px" }}
                        >
                            Volver
                        </button>
                    </form>
                    <DeleteUserButton id={useData.id} />
                </div>
            )}
        </>
    );
};

export default UserGestion;
