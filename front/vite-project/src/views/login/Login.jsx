import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const POSTUSERLOGIN_URL = "http://localhost:3000/users/login";

function Login() {

    const navigate = useNavigate();
    const initialState = {
        username: "",
        password: "",
    };
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const validateUser = ({ username, password }) => {
        const errors = {};
        if (!username) errors.username = "Ingresar username";
        if (!password) errors.password = "Ingresar password";
        return errors;
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setErrors(validateUser({ ...user, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(POSTUSERLOGIN_URL, user)
            .then(({ data }) => {
                localStorage.setItem("actualUser", JSON.stringify(data));
                alert("Usuario logueado...");
                setUser(initialState);
                navigate("/home");
            })
            .catch((error) => {
                alert(`Acceso denegado: ${error.response?.data?.message}`);
            });
    };
    const formData = [
        { label: "Username", name: "username", type: "text" },
        { label: "Password", name: "password", type: "password" },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Iniciar Sesión</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    {formData.map(({ label, name, type }) => (
                        <div key={name} className={styles.formGroup}>
                            <label htmlFor={name}>{label}</label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={user[name]}
                                placeholder={`Ingresar ${label.toLowerCase()}`}
                                onChange={handleChange}
                            />
                            {errors[name] && (
                                <span className={styles.error}>{errors[name]}</span>
                            )}
                        </div>
                    ))}
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={Object.keys(user).some((e) => !user[e])}
                    >
                        Ingresar
                    </button>
                </form>
                <div className={styles.extraButtons}>
                    <Link to="/register">
                        <button className={styles.secondaryButton}>Registrarse</button>
                    </Link>
                    <Link to="/home">
                        <button className={styles.secondaryButton}>Ingresar como invitado</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
