import { useState } from "react";
import { Navigate } from "react-router-dom";
import style from "./ReactivatePages.module.css";
import { useLocation } from "react-router-dom";

const ReactivatePage = () => {
    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState("");
    const [isRedirecting, setRedirecting] = useState(false);
    const { state } = useLocation();
    const email = state;

    function ocultarCorreoElectronico(email) {
        const [nombreUsuario, dominio] = email.split("@");
        const parteVisible = nombreUsuario.substring(0, 2);
        const parteOculta = "*".repeat(Math.max(nombreUsuario.length - 2, 0));
        const emailOculto = `${parteVisible}${parteOculta}@${dominio}`;
        return emailOculto;
    }
    //! Esta funcion la podria sacar de aqui.
    const emailOculto = ocultarCorreoElectronico(email);

    console.log(emailOculto);

    const handleVerificationcode = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/users/reactivate_account",
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        verificationcode: code,
                        password: password,
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw {
                    status: data.status,
                    text: data.message || "There has been an error",
                };
            }

            console.log(data);
            setRedirecting(true);
        } catch (error) {
            console.log("Error. ", error);
        }
    };

    const handleInputChange = (e) => {
        setCode(e.target.value);
        console.log(code);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };
    const handlePassword2 = (e) => {
        setPassword2(e.target.value);
        console.log(password2);
    };

    if (isRedirecting) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className={style.reactivatePageContainer}>
                <div className={style.reactivatePageForm}>
                    <form
                        className={style.form}
                        onSubmit={handleVerificationcode}
                    >
                        <h3 className={style.h3}>Correo electrónico enviado</h3>
                        <p className={style.p}>
                            Hemos enviado un correo a tu cuenta {emailOculto},
                            introduce el codigo de verificacion y la nueva
                            contraseña a continuacion para continuar
                        </p>
                        <label className={style.label}>
                            New Password:
                            <input
                                className={style.input}
                                type="password"
                                name="Password"
                                onChange={handlePassword}
                            ></input>
                        </label>
                        <label className={style.label}>
                            Repeat Password:
                            <input
                                className={style.input}
                                type="password"
                                name="Password"
                                onChange={handlePassword2}
                            ></input>
                        </label>{" "}
                        <label className={style.label}>
                            Codigo:
                            <input
                                autoComplete="off"
                                className={style.input}
                                type="text"
                                name="codigo"
                                onChange={handleInputChange}
                            />
                        </label>
                        {password !== password2 && password2 !== "" && (
                            <p className={style.error}>
                                Las contraseñas no coinciden
                            </p>
                        )}
                        <button
                            className={style.Enviar}
                            type="button"
                            onClick={handleVerificationcode}
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ReactivatePage;
