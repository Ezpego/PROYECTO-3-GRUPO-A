import { useState } from "react";
import { registerUserService } from "../hooks/useFetch1";
import { useNavigate } from "react-router-dom";
import style from "./RegisterPage.module.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== password2) {
            setError("Las contraseñas no coinciden");
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
            navigate("/");
        } catch (error) {
            if (error.message === "El correo electrónico ya está en uso") {
                setError(
                    "El correo electrónico ya está en uso. Por favor, elige otro."
                );
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <section className={style.registerContainer}>
            <h1>Registro</h1>
            <div>
                <form className={style.form} onSubmit={handleForm}>
                    <label className={style.label} htmlFor="name">
                        Nombre
                        <input
                            className={style.input}
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className={style.label} htmlFor="email">
                        Correo Electrónico
                        <input
                            className={style.input}
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className={style.label} htmlFor="password">
                        Contraseña
                        <input
                            className={style.input}
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label className={style.label} htmlFor="password2">
                        Repetir Contraseña
                        <input
                            className={style.input}
                            type="password"
                            id="password2"
                            name="password2"
                            required
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </label>

                    {!error ? (
                        <p className={style.p}>
                            La contraseña debe contener al menos una mayúscula ,
                            un nº y 8 caracteres.
                        </p>
                    ) : (
                        <p className={style.p}>{error}</p>
                    )}
                    <button>Enviar</button>
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;
