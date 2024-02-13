import style from "./ExercisesFormCreated.module.css";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { llamadaServidor } from "../../utils/llamadasServidor";
import TokenContext from "../../context/TokenContext";

const FormExercises = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [data, setData] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState("");
    const { token } = useContext(TokenContext);

    useEffect(() => {
        const filtros = async () => {
            try {
                const response = await fetch("http://localhost:3000/filter", {
                    method: "GET",
                    headers: {
                        authorization: `${token}`,
                    },
                });
                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error("Error. ", error);
            }
            return data;
        };
        filtros();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (data) => {
        console.log("Datos: ", data);
        console.log(data.photo[0]);
        const sendExercice = async () => {
            const urlObjetivo = "/exercises";
            const opciones = {
                authorization: `${token}`,
            };
            const formDataToSend = new FormData();
            formDataToSend.append("photo", data.photo[0]);
            Object.entries(data).forEach(([key, value]) => {
                if (key !== "photo") {
                    formDataToSend.append(key, value);
                }
            });

            const result = await llamadaServidor(
                urlObjetivo,
                "POST",
                opciones,
                formDataToSend
            );

            console.log(result);
        };

        sendExercice();
        reset();
        setPreviewSrc();
    };

    return (
        <>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={style.label}>
                    Nombre
                    <input
                        className={style.input}
                        type="text"
                        {...register("name", { required: true })}
                        maxLength={30}
                    />
                </label>
                {errors.name && (
                    <span className={style.error}>
                        Este campo es obligatorio
                    </span>
                )}
                <label className={style.label}>
                    Descripcion
                    <textarea
                        className={style.textarea}
                        {...register("description", { required: true })}
                    />
                </label>
                {errors.description && (
                    <span className={style.error}>
                        Este campo es obligatorio
                    </span>
                )}
                <label className={style.label} htmlFor="difficulty_level">
                    Nivel de dificultad
                </label>
                <select
                    className={style.select}
                    id="difficulty_level"
                    name="difficulty_level"
                    {...register("difficulty_level", { required: true })}
                >
                    <option value="">Nada seleccionado</option>
                    {data &&
                        data.difficulty_level.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                </select>
                {errors.difficulty_level && (
                    <span className={style.error}>
                        Este campo es obligatorio
                    </span>
                )}
                <label className={style.label} htmlFor="muscle_group">
                    Grupo muscular
                </label>
                <select
                    className={style.select}
                    id="muscle_group"
                    name="muscle_group"
                    {...register("muscle_group", { required: true })}
                >
                    <option value="">Nada seleccionado</option>
                    {data &&
                        data.muscle.map((item) => (
                            <option key={item.id} id={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                {errors.muscle_group && (
                    <span className={style.error}>
                        Este campo es obligatorio
                    </span>
                )}
                <label className={style.label} htmlFor="typology">
                    Tipologia
                </label>
                <select
                    className={style.select}
                    id="typology"
                    name="typology"
                    {...register("typology", { required: true })}
                >
                    <option value="">Nada seleccionado</option>
                    {data &&
                        data.typology.map((item) => (
                            <option key={item.id} id={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                {errors.typology && (
                    <span className={style.error}>
                        Este campo es obligatorio
                    </span>
                )}
                <label className={style.label}>
                    Imagen
                    <input
                        className={style.input}
                        type="file"
                        {...register("photo", { required: true })}
                        onChange={handleImageChange}
                    />
                </label>

                {errors.photo && (
                    <span className={style.error}>
                        Este campo es obligatorio
                    </span>
                )}
                {previewSrc && (
                    <img
                        className={style.imgForm}
                        src={previewSrc}
                        alt="preview"
                    />
                )}
                <button className={style.Enviar} type="submit">
                    Enviar
                </button>
                <button
                    type="button"
                    className={style.Volver}
                    onClick={() => window.location.reload()}
                >
                    Volver
                </button>
            </form>
        </>
    );
};

export default FormExercises;
