import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { llamadaServidor } from "../../utils/llamadasServidor";
import TokenContext from "../../context/TokenContext";

const FormExercises = ({ onSubmit }) => {
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

  // onSubmit = (data) => {
  //     console.log("Datos: ", data);
  //     console.log(data.photo[0]);
  //     const sendExercice = async () => {
  //         const urlObjetivo = "/exercises";
  //         const opciones = {
  //             authorization:
  //                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlcm1pbmF0b3IiLCJpc0FkbWluaXN0cmF0b3IiOjEsImlhdCI6MTcwNjk4NjM1MiwiZXhwIjoxNzA3NTkxMTUyfQ.OB9EH7Y3qzGQlgFvgTQwzwyEDiJEoiwwzvSMZOWxt3k",
  //         };
  //         const formDataToSend = new FormData();
  //         formDataToSend.append("photo", data.photo[0]);
  //         Object.entries(data).forEach(([key, value]) => {
  //             if (key !== "photo") {
  //                 formDataToSend.append(key, value);
  //             }
  //         });

  //         const result = await llamadaServidor(
  //             urlObjetivo,
  //             "POST",
  //             opciones,
  //             formDataToSend
  //         );

  //         console.log(result);
  //     };

  //     sendExercice();
  //     reset();
  //     setPreviewSrc();
  // };

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

        <label>
          Descripcion
          <textarea {...register("description", { required: true })} />
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
          {...register("photo", { required: true })}
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
        {previewSrc && <img src={previewSrc} alt="preview" width={"200px"} />}

        <button type="submit">Enviar</button>
        <button
          onClick={() => window.location.reload()}
          style={{ color: "red", marginLeft: "50px" }}
        >
          Volver
        </button>
      </form>
    </>
  );
};

export default FormExercises;
