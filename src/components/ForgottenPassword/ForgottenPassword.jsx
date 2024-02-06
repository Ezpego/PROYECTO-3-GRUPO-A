import "./ForgottenPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";

import Spinner from "../Spinner/Spinner";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null);
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      setIsPending(true);
      const url = `${urlRaiz}/users/forgottenPassword`;
      console.log("URL de la solicitud:", url);
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      };

      const response = await fetchData(
        `${urlRaiz}/users/forgottenPassword`,
        options
      );
      console.log("Response forgotten:", response);
      // !Hay que arreglar el manejo de los errores, al usar el fetchData importado, ahora mismo no estamos
      // !accediendo al error del backend, en este momento estamos haciendo referencia al response de la linea 37,
      // !y ese no trae ninguna propiedad .status, .statusText.
      if (!response.data.message) {
        throw new Error(
          `Error al enviar la solicitud: ${response.status} - ${response.statusText}`
        );
      }
      const objemail = email;
      setEmail("");
      navigate("/users/reactivate_account", { state: objemail });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
      setError(
        "Hubo un error al procesar la solicitud. Por favor, intenta nuevamente."
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleReturnButton = () => {
    navigate(`/`);
  };
  return (
    <>
      <form>
        <label>
          Por favor, ingresa tu dirección de correo electrónico para recuperar
          tu contraseña:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Correo electrónico"
            required
          />
        </label>
        <button onClick={handleForgotPassword} className="Enviar">
          {isPending ? (
            <>
              <Spinner /> Enviando...
            </>
          ) : (
            "Enviar Solicitud"
          )}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <section>
        <p className="center"> ¿ No puedes restablecer tu contraseña ? </p>
        <Link to="/users/register" className="link">
          Crear nueva cuenta
        </Link>
      </section>
      <section>
        <button onClick={handleReturnButton} className="Volver">
          Volver al inicio de sesión
        </button>
      </section>
    </>
  );
};

export default ForgottenPassword;
