import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { sendInformationLogin } from "../../utils/consultasServidor";
import TokenContext from "../../context/TokenContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { token, setToken, tokenUpdate } = useContext(TokenContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    if (!form.password || !form.email) {
      setErrorMessage("Introduce datos válidos");
    } else {
      setErrorMessage("");

      const prueba = await sendInformationLogin(form);
      setForm({ email: "", password: "" });

      if (prueba.message) {
        navigate("/users/reactivate_account", {
          state: prueba.email,
        });
      }
      if (!prueba.ok) {
        setErrorMessage(prueba.statusText);
      }
      if (prueba.token) {
        tokenUpdate(prueba.token);
        console.log("este es token que mando a actualizar", prueba.token);
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="loginform">
          <form action="" onSubmit={handleForm} className="loginform">
            <label htmlFor="">email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrorMessage("");
              }}
              required
              value={form.email}
            ></input>
            <label htmlFor="">password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setErrorMessage("");
              }}
              value={form.password}
              required
            ></input>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button>Login</button>
          </form>

          <p
            className="forgotpassword"
            onClick={(e) => {
              navigate("/users/forgottenPassword");
            }}
          >
            ¿Has olvidado tu contraseña?
          </p>
          <button
            className="register"
            onClick={() => {
              navigate("/users/register");
            }}
          >
            Registrar
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

// import { useState, useContext } from 'react';
// import UserContext from '../../context/UserContext';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
// const { handleUser } = useContext(UserContext);
// const [formData, setFormData] = useState({ email: '', password: '' });
// const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;
// const navigate = useNavigate();

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//     const response = await fetch(`${urlRaiz}/users/login`, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//         const { token } = await response.json();
//         console.log('Token: ', token);

//         localStorage.setItem('token', token);

//         const userDataResponse = await fetch(`${urlRaiz}/users/data`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//         },
//         });

//         if (userDataResponse.ok) {
//         const userData = await userDataResponse.json();
//         handleUser(userData);
//         navigate('/user/:userId/editProfile');
//         console.log('Datos del usuario almacenados en el contexto:', userData);
//         } else {
//         console.error('Error al obtener datos del usuario');
//         }
//     } else {
//         console.error('Autenticación fallida');
//     }
//     } catch (error) {
//     console.error('Error al procesar la autenticación', error);
//     }
// };

// const handleChange = (e) => {
//     setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//     });
// };

// return (
//     <form onSubmit={handleSubmit}>
//     <label>
//         Email:
//         <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         />
//     </label>
//     <label>
//         Password:
//         <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         />
//     </label>
//     <button type="submit">Iniciar sesión</button>
//     </form>
//   );
// };

// export default LoginForm;
