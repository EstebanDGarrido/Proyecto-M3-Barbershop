import React, { useState } from 'react'
import validateUser from '../../helpers/validateUser';
import axios from "axios"
import styles from "./Register.module.css"
import { Link, useNavigate } from "react-router-dom";

const POST_USER_URL = "http://localhost:3000/users/register"

export default function Register() {
    const navigate = useNavigate();
    const initialState = {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        birthdate: "",
        nDni: "",
    }
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setErrors(validateUser({ ...user, [name]: value }));
    }
    const handleReset = (event) => {
        event.preventDefault();
        setUser(initialState);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: user.name,
            username: user.username,
            password: user.password,
            email: user.email,
            birthdate: user.birthdate,
            nDni: Number(user.nDni),
        };
        axios
            .post(POST_USER_URL, userData)
            .then(({ data }) => {
                alert("Usuario creado con éxito.");
                setUser(initialState);
                navigate("/login")
            })
            .catch((error) => {
                alert(`Se ha producido un error. ${error.name} - ${error.message}`)
                console.log(error.message);
            });
    }
    const formData = [
        { label: "Nombre: ", name: "name", type: "text" },
        { label: "Username: ", name: "username", type: "text" },
        { label: "Password: ", name: "password", type: "password" },
        { label: "Confirmar Password: ", name: "confirmPassword", type: "password" },
        { label: "Email: ", name: "email", type: "text" },
        { label: "Fecha de Nacimiento: ", name: "birthdate", type: "date" },
        { label: "N° DNI: ", name: "nDni", type: "text" },
    ];
    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.title}>Registro</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                {formData.map(({ label, name, type }) => {
                    return (
                        <div key={name} className={styles.inputGroup}>
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
                    );
                })}
                <div className={styles.buttons}>
                    <button onClick={handleReset} type="button">Borrar Formulario</button>
                    <button
                        type='submit'
                        disabled={Object.keys(user).some((e) => !user[e])}
                    >
                        Registrar
                    </button>
                </div>
            </form>
            <div className={styles.extraActions}>
                <Link to="/login">
                    <button className={styles.secondary}>¿Ya tienes cuenta? Inicia Sesión</button>
                </Link>
                <Link to="/home">
                    <button className={styles.secondary}>Ingresar como Invitado</button>
                </Link>
            </div>
        </div>
    )
}
