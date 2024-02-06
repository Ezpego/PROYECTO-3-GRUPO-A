import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import TokenContext from "../../context/TokenContext";

Modal.setAppElement("#root");

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { userData } = useContext(TokenContext);
  const [emailFromServer, setEmailFromServer] = useState("");

  console.log("EMAILFROMSERVERMODAL", emailFromServer);

  const [successMessage, setSuccessMessage] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
    general: "",
  });
  const userId = userData.id;
  const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getEmail = async () => {
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
          console.error("Error al obtener el correo electrónico del servidor");
        }
      } catch (error) {
        console.error("Error de red al obtener el correo electrónico", error);
      }
    };

    getEmail();
  }, [urlRaiz, token]);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
      general: "",
    });
  };

  const verifyCurrentPassword = async () => {
    console.log("EmailFromServer antes de fetch", emailFromServer);
    try {
      const response = await fetch(`${urlRaiz}/users/pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({
          email: emailFromServer,
          currentPassword: passwordData.currentPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Error verifying current password");
      }
      return true;
    } catch (error) {
      console.error(error);
      setErrors({
        ...errors,
        currentPassword: "Error verifying current password",
      });
      return false;
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      general: "",
    });
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      setErrors({
        ...errors,
        repeatNewPassword: "Las contraseñas no coinciden",
      });
      return;
    }
    const isCurrentPasswordValid = await verifyCurrentPassword();

    if (!emailFromServer) {
      throw new Error("Error al recibir el emailsito");
    }

    if (isCurrentPasswordValid) {
      try {
        const response = await fetch(`${urlRaiz}/user/${userId}/editProfile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            password: passwordData.newPassword,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          console.log("newToken", data.newToken);
          if (data.newToken) {
            localStorage.setItem("token", data.newToken);
          }

          setSuccessMessage("Contraseña cambiada con éxito");

          setTimeout(() => {
            onClose();
            setSuccessMessage("");
          }, 2000);
        } else {
          const responseData = await response.text();
          console.error("Respuesta del servidorcito:", responseData);
          const errorData = responseData ? JSON.parse(responseData) : {};
          console.log("ErrorData profilepage : ", errorData);
          throw new Error(
            errorData.message || "Error al actualizar la contraseña"
          );
        }
      } catch (error) {
        console.error("Error al actualizar la contraseña", error);
        setErrors({
          ...errors,
          general: "Error al actualizar la contraseña",
        });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cambiar Contraseña"
    >
      {successMessage ? (
        <h2>Contraseña cambiada con exito</h2>
      ) : (
        <>
          <h2>Cambiar Contraseña</h2>
          <p>
            La contraseña debe tener al menos 8 caracteres, una letra mayúscula
            y un número.
          </p>
          <form onSubmit={handlePasswordSubmit}>
            <label>
              Contraseña Actual:
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              <span className="error">{errors.currentPassword}</span>
            </label>

            <label>
              Nueva Contraseña:
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <span className="error">{errors.newPassword}</span>
            </label>

            <label>
              Repetir Nueva Contraseña:
              <input
                type="password"
                name="repeatNewPassword"
                value={passwordData.repeatNewPassword}
                onChange={handlePasswordChange}
                required
              />
              <span className="error">{errors.repeatNewPassword}</span>
            </label>

            <button type="submit">Cambiar Contraseña</button>
            <button onClick={onClose}>Cancelar</button>
            {errors.general && <div className="error">{errors.general}</div>}
          </form>
        </>
      )}
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ChangePasswordModal;
