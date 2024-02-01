import { useState } from "react";
import { registerUserService } from "../hooks/useFetch1";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== password2) {
      setError("password do not match");
      return;
    }
    if (
      !password ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !email
    ) {
      setError("Introduce datos válidos");
      return;
    }

    try {
      await registerUserService({ name, email, password });
      // navigate("/login"); PARA CUANDO ESTEN ENSAMBLADAS LAS PAGINAS
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>register</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password2"> Repeat password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </fieldset>
        <button>Send</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};

export default RegisterPage;