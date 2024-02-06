// import "./EditProfileForm.css";

// import { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
// // import UserContext from '../../context/UserContext';

// import TokenContext from "../../context/TokenContext";

// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
// import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

// const EditProfileForm = ({ onUpdateProfile, onCancelEditProfile, errors }) => {
//   // const {user, updateUser} = useContext(UserContext);
//   const { userData, updateUser } = useContext(TokenContext);
//   const [showEmail, setShowEmail] = useState(false);
//   const [emailFromServer, setEmailFromServer] = useState("");
//   const [formErrors, setFormErrors] = useState(errors);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
//     useState(false);
//   const [editedData, setEditedData] = useState({
//     name: userData?.name || "",
//     last_name: userData?.last_name || "",
//     dni: userData?.dni || "",
//     birth_date: userData?.birth_date || "",
//     email: "",
//     password: userData?.password || "",
//     phone_number: userData?.phone_number || "",
//     photo: userData?.profile_image_url || "",
//   });

//   useEffect(() => {
//     setFormErrors(errors);

//     if (errors) {
//       setEditedData({
//         name: editedData.name || "",
//         last_name: editedData.last_name || "",
//         dni: editedData.dni || "",
//         birth_date: editedData.birth_date || "",
//         email: "",
//         password: "",
//         phone_number: editedData.phone_number || "",
//         photo: editedData.profile_image_url || "",
//       });
//     } else {
//       // ECHAR UN OJO AL WARNING QUE PONE EN LA LINEA 55
//       setEditedData({
//         name: userData?.name || "",
//         last_name: userData?.last_name || "",
//         dni: userData?.dni || "",
//         birth_date: userData?.birth_date || "",
//         email: "",
//         password: "",
//         phone_number: userData?.phone_number || "",
//         photo: userData?.profile_image_url || "",
//       });
//     }
//   }, [userData, errors]);

//   const userId = userData.id;
//   const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;

//   console.log("ErRORS:", errors);
//   console.log("FORMERRORS:", formErrors);

//   const openChangePasswordModal = () => {
//     setIsChangePasswordModalOpen(true);
//   };

//   const closeChangePasswordModal = () => {
//     setIsChangePasswordModalOpen(false);
//   };

//   function formatDate(dateString) {
//     const date = dateString ? new Date(dateString) : new Date();
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   const showInputEmail = async () => {
//     const token = localStorage.getItem("token");
//     console.log("TOKEN DEL EDITFORMPRF:", token);
//     try {
//       const response = await fetch(`${urlRaiz}/users/data`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const { email } = await response.json();
//         setEmailFromServer(email);
//       } else {
//         console.error("Error al obtener el correo electrónico del servidor");
//       }
//     } catch (error) {
//       console.error("Error de red al obtener el correo electrónico", error);
//     }
//     setShowEmail(!showEmail);
//   };

//   const handleChange = (e) => {
//     if (e.target.name === "photo") {
//       const file = e.target.files[0];
//       setSelectedFile(file);
//     } else {
//       setEditedData({
//         ...editedData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let formattedDate = "";
//     if (editedData.birth_date) {
//       const dateObj = new Date(editedData.birth_date);
//       const year = dateObj.getFullYear();
//       const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//       const day = String(dateObj.getDate()).padStart(2, "0");

//       formattedDate = `${year}-${month}-${day}`;
//     }

//     const formData = new FormData();
//     formData.append("name", editedData.name);
//     formData.append("last_name", editedData.last_name);
//     formData.append("dni", editedData.dni);
//     formData.append("birth_date", formattedDate);
//     formData.append("email", editedData.email.trim());
//     formData.append("password", editedData.password.trim());
//     formData.append("phone_number", editedData.phone_number);
//     formData.append("photo", selectedFile);

//     try {
//       await onUpdateProfile(userId, formData);
//       const token = localStorage.getItem("token");
//       const updatedUserDataResponse = await fetch(`${urlRaiz}/users/data`, {
//         method: "GET",
//         headers: {
//           authorization: `${token}`,
//         },
//       });

//       if (updatedUserDataResponse.ok) {
//         const updatedUserData = await updatedUserDataResponse.json();

//         updateUser({
//           name: updatedUserData.name,
//           last_name: updatedUserData.last_name,
//           dni: updatedUserData.dni,
//           birth_date: updatedUserData.birth_date,
//           email: updatedUserData.email,
//           password: updatedUserData.password,
//           phone_number: updatedUserData.phone_number,
//           profile_image_url: updatedUserData.profile_image_url,
//         });
//         console.log("FECHA NACIMIENTOOO", updatedUserData.birth_date);
//       } else {
//         console.error("Error al obtener datos actualizados del usuario");
//       }
//     } catch (error) {
//       console.error("Error en la función handleSubmit:", error);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Nombre:
//           <input
//             type="text"
//             name="name"
//             value={editedData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Apellido:
//           <input
//             type="text"
//             name="last_name"
//             value={editedData.last_name}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           DNI:
//           <input
//             type="text"
//             name="dni"
//             value={editedData.dni}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Fecha de Nacimiento:&nbsp;
//           <span className="stored-date">
//             {formatDate(editedData.birth_date)}
//           </span>
//           <input
//             type="date"
//             name="birth_date"
//             value={editedData.birth_date}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={editedData.email}
//             onChange={handleChange}
//             autoComplete="off"
//           />
//           <button type="button" onClick={showInputEmail}>
//             {showEmail ? <FaRegEyeSlash /> : <FaRegEye />}
//           </button>
//           {showEmail && <div className="display-email">{emailFromServer}</div>}
//           {formErrors && formErrors.includes("Email") && (
//             <div className="error-message">{formErrors}</div>
//           )}
//         </label>

//         <label>
//           Contraseña:
//           <button type="button" onClick={openChangePasswordModal}>
//             Cambiar Contraseña
//           </button>
//           {formErrors && formErrors.includes("Password") && (
//             <div className="error-message">{formErrors}</div>
//           )}
//         </label>

//         <label>
//           Número de Teléfono:
//           <input
//             type="text"
//             name="phone_number"
//             value={editedData.phone_number}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Imagen de Perfil:
//           <input
//             type="file"
//             accept="image/*"
//             name="photo"
//             onChange={handleChange}
//           />
//         </label>

//         <button type="submit">Guardar Cambios</button>
//         <button onClick={onCancelEditProfile}>Salir</button>
//       </form>

//       <ChangePasswordModal
//         isOpen={isChangePasswordModalOpen}
//         onClose={closeChangePasswordModal}
//       />
//     </>
//   );
// };

// EditProfileForm.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string,
//     last_name: PropTypes.string,
//     dni: PropTypes.string,
//     birth_date: PropTypes.string,
//     email: PropTypes.string,
//     phone_number: PropTypes.string,
//     profile_image_url: PropTypes.string,
//   }),
//   onLogout: PropTypes.func,
//   onUpdateProfile: PropTypes.func,
//   onEditProfileClick: PropTypes.func,
//   onCancelEditProfile: PropTypes.func,
//   errors: PropTypes.string,
// };

// export default EditProfileForm;

import "./EditProfileForm.css";

import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// import UserContext from '../../context/UserContext';

import TokenContext from "../../context/TokenContext";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

const EditProfileForm = ({ onUpdateProfile, onCancelEditProfile, errors }) => {
  // const {user, updateUser} = useContext(UserContext);
  const { userData, updateUser } = useContext(TokenContext);
  const [showEmail, setShowEmail] = useState(false);
  const [emailFromServer, setEmailFromServer] = useState("");
  const [formErrors, setFormErrors] = useState(errors);
  const [selectedFile, setSelectedFile] = useState(null);
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
    const token = localStorage.getItem("token");
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
        console.error("Error al obtener el correo electrónico del servidor");
      }
    } catch (error) {
      console.error("Error de red al obtener el correo electrónico", error);
    }
    setShowEmail(!showEmail);
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setSelectedFile(file);
    } else {
      setEditedData({
        ...editedData,
        [e.target.name]: e.target.value,
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
      const token = localStorage.getItem("token");
      const updatedUserDataResponse = await fetch(`${urlRaiz}/users/data`, {
        method: "GET",
        headers: {
          authorization: `${token}`,
        },
      });

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
          profile_image_url: updatedUserData.profile_image_url,
        });
        console.log("FECHA NACIMIENTOOO", updatedUserData.birth_date);
      } else {
        console.error("Error al obtener datos actualizados del usuario");
      }
    } catch (error) {
      console.error("Error en la función handleSubmit:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            name="last_name"
            value={editedData.last_name}
            onChange={handleChange}
          />
        </label>

        <label>
          DNI:
          <input
            type="text"
            name="dni"
            value={editedData.dni}
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha de Nacimiento:&nbsp;
          <span className="stored-date">
            {formatDate(editedData.birth_date)}
          </span>
          <input
            type="date"
            name="birth_date"
            value={editedData.birth_date}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="button" onClick={showInputEmail}>
            {showEmail ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
          {showEmail && <div className="display-email">{emailFromServer}</div>}
          {formErrors && formErrors.includes("Email") && (
            <div className="error-message">{formErrors}</div>
          )}
        </label>

        <label>
          Contraseña:
          <button type="button" onClick={openChangePasswordModal}>
            Cambiar Contraseña
          </button>
          {formErrors && formErrors.includes("Password") && (
            <div className="error-message">{formErrors}</div>
          )}
        </label>

        <label>
          Número de Teléfono:
          <input
            type="text"
            name="phone_number"
            value={editedData.phone_number}
            onChange={handleChange}
          />
        </label>

        <label>
          Imagen de Perfil:
          <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Guardar Cambios</button>
        <button onClick={onCancelEditProfile}>Salir</button>
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
