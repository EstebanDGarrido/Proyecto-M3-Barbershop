import axios from "axios";
import styles from "./AppointmentForm.module.css"
import React, { useEffect, useState } from 'react'
import { data, useNavigate } from "react-router-dom"
import { getUserIdFromLocalStorage } from "../../helpers/actualUser.js"
const POSTAPPOINTMENT_URL = "http://localhost:3000/appointments/schedule";

export default function AppointmentForm() {
    const navigate = useNavigate();
    const userId = getUserIdFromLocalStorage();
    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
    }, [userId, navigate]);
    const initialState = {
        date: "",
        hours: "09",
        minutes: "00",
        description: "",
    };
    const [appointment, setAppointment] = useState(initialState);
    const [errors, setErrors] = useState({
        date: "Debe ingresar una fecha",
    });
    const isWeekend = (date) => {
        const day = new Date(date).getDay();
        return day === 5 || day === 6;
    };
    const validateAppointment = ({
        date, hours, minutes, description
    }) => {
        const errors = {};
        if (!date) errors.date = "Ingresar fecha";
        else if (isWeekend(date))
            errors.date = "La fecha seleccionada es un fin de semana";
        if (!description) errors.description = "Ingresar descripción";
        else if (description.length < 5)
            errors.description = "Descripción de al menos 5 caracteres";
        else if (description.length > 25)
            errors.description = "Descripción de hasta 25 caracteres";
        return errors;
    }
    const handleChange = (event) => {
        const { value, name } = event.target;
        const updatedAppointment = {
            ...appointment,
            [name]: value,
        }
        setAppointment(updatedAppointment);
        setErrors(validateAppointment(updatedAppointment));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const newAppointment = {
            date: appointment.date,
            time: `${appointment.hours.padStart(2, "0")}:${appointment.minutes.padStart(2, "0")}`,
            description: appointment.description,
            userId,
        };
        console.log(newAppointment);
        axios
            .post(POSTAPPOINTMENT_URL, newAppointment)
            .then(({ data }) => {
                alert(`Ha sido creada la reserva: fecha ${data.date}, hora ${data.time}`);
                setAppointment(initialState);
                navigate("/appointments");
            })
            .catch((error) => {
                alert(`Error: ${error.response.data.error}`);
            });
    };
    const validHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    const validMinutes = ["00", "30"];
    function getTomorrow() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    }
    function getFourTeenDaysAhead() {
        const today = new Date();
        const getFourTeenDaysAhead = new Date(today);
        getFourTeenDaysAhead.setDate(getFourTeenDaysAhead.getDate() + 13);
        return getFourTeenDaysAhead.toISOString().split("T")[0];
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.card}>
                <h2>Nueva Reserva</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Fecha:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={getTomorrow()}
                            max={getFourTeenDaysAhead()}
                            value={appointment.date}
                            onChange={handleChange}
                        />
                        {errors.date && <span className={styles.error}>{errors.date}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="time">Horario:</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <select
                                id="hours"
                                name="hours"
                                value={appointment.hours}
                                onChange={handleChange}
                            >
                                {validHours.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="minutes"
                                name="minutes"
                                value={appointment.minutes}
                                onChange={handleChange}
                            >
                                {validMinutes.map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Descripción:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={appointment.description}
                            placeholder="Ingresar descripción..."
                            onChange={handleChange}
                        />
                        {errors.description && (
                            <span className={styles.error}>{errors.description}</span>
                        )}
                    </div>
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={Object.keys(errors).length > 0}
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}