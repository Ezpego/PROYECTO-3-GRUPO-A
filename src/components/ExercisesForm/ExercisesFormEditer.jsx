import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { llamadaServidor } from "../../utils/llamadasServidor";
import TokenContext from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FormExercisesEditer = () => {
    const { state } = useLocation();
    console.log(state);

    const defaultValues = state || {};

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues });

    const [data, setData] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(defaultValues.photo);
    const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(
        defaultValues.difficulty_level
    );
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(
        defaultValues.muscle_group
    );
    const [selectedTypology, setSelectedTypology] = useState(
        defaultValues.typology
    );
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    useEffect(() => {
        const filtros = async () => {
            try {
                const urlObjetivo = "/filter";
                const opciones = {
                    "Content-Type": "multipart/form-data",
                    authorization: `${token}`,
                };

                const result = await llamadaServidor(
                    urlObjetivo,
                    "GET",
                    opciones
                );
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
            const urlObjetivo = "/exercises/" + data.id + "/";

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
                "PATCH",
                opciones,
                formDataToSend
            );

            console.log(result);
            navigate("/");
        };

        sendExercice();
    };

    return (
        <>
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
                ;
                <label>
                    Descripcion
                    <textarea
                        {...register("description", { required: true })}
                    />
                </label>
                {errors.description && (
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
                <label htmlFor="difficulty_level">Nivel de dificultad</label>
                <select
                    id="difficulty_level"
                    name="difficulty_level"
                    {...register("difficulty_level", { required: true })}
                    value={selectedDifficultyLevel}
                    onChange={(e) => setSelectedDifficultyLevel(e.target.value)}
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
                <label htmlFor="muscle_group">Grupo muscular</label>
                <select
                    id="muscle_group"
                    name="muscle_group"
                    {...register("muscle_group", { required: true })}
                    value={selectedMuscleGroup}
                    onChange={(e) => setSelectedMuscleGroup(e.target.value)}
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
                <select
                    id="typology"
                    name="typology"
                    {...register("typology", { required: true })}
                    value={selectedTypology}
                    onChange={(e) => setSelectedTypology(e.target.value)}
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
                <input
                    type="file"
                    {...register("photo", { required: false })}
                    onChange={handleImageChange}
                />
                {errors.photo && (
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
                {previewSrc && (
                    <img src={previewSrc} alt="preview" width={"200px"} />
                )}
                <button type="submit">Editar</button>
                <button
                    onClick={() => navigate("/")}
                    style={{ color: "red", marginLeft: "50px" }}
                >
                    Volver
                </button>
            </form>
        </>
    );
};

export default FormExercisesEditer;
