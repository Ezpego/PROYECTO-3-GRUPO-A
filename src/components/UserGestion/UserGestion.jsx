// import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { llamadaServidor } from "../../utils/llamadasServidor";
import { Link } from "react-router-dom";
import { useContext } from "react";
import TokenContext from "../../context/TokenContext";

const UserGestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const { token } = useContext(TokenContext);

  return (
    <>
      <form onSubmit={handleSubmit()}>
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
          <input type="text" {...register("last_name")} maxLength={50} />
        </label>

        <label>
          DNI
          <input type="text" {...register("dni")} maxLength={20} />
        </label>

        <label>
          Fecha de Nacimiento
          <input type="date" {...register("birth_date")} />
        </label>

        <label>
          Número de Teléfono
          <input type="tel" {...register("phone_number")} maxLength={20} />
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
            {...register("profile_image_url", { required: true })}
            // onChange={handleImageChange}
          />
        </label>

        <label>
          Habilitado
          <input type="checkbox" {...register("isEnabled")} defaultChecked />
        </label>

        <label>
          Administrador
          <input type="checkbox" {...register("isAdministrator")} />
        </label>

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

export default UserGestion;
