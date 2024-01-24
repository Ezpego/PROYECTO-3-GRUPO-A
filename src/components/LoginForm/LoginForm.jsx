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
          state: { userData: prueba.email },
        });
      }
      if (!prueba.ok) {
        setErrorMessage(prueba.statusText);
      }
      if (prueba.token) {
        tokenUpdate(prueba.token);
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
