import { useEffect, useState } from "react";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";
import axios from "axios";
import styles from "./MisTurnos.module.css";
import { data, useNavigate } from "react-router-dom";
import { getUserIdFromLocalStorage } from "../../helpers/actualUser";

const GET_APPOINTMENTS = "http://localhost:3000/appointments";
const GET_USERBYID = "http://localhost:3000/users/";
const PUT_CANCELBYID = "http://localhost:3000/appointments/cancel/"

export default function Appointments() {

    const userId = getUserIdFromLocalStorage();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
    }, [userId, navigate]);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        axios(GET_USERBYID + userId)
            .then((response) => response.data)
            .then((userFromDB) => setAppointments(userFromDB.appointments))
            .catch((error) => {
                console.log(error);
                alert("Error al consultar las reservas, prueba más tarde...");
            });
    }, [userId]);
    const handleAppointmentCancel = (appointmentId) => {
        axios
            .put(PUT_CANCELBYID + appointmentId)
            .then((response) => response.data)
            .then((data) => {
                axios(GET_USERBYID + userId)
                    .then((response) => response.data)
                    .then((userFromDB) => setAppointments(userFromDB.appointments))
                    .catch((error) => {
                        console.log(error);
                        alert("Error al consultar las reservas, prueba más tarde...");
                    });
            })
            .catch((error) => alert(`Error al cancelar el turno con id ${appointmentId}`))
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mis Reservas</h1>
            {
                appointments.length ? (
                    <div className={styles.cardsContainer}>
                        {appointments.map((appointment, index) => (
                            <AppointmentCard
                                key={index}
                                id={appointment.id}
                                date={appointment.date}
                                time={appointment.time}
                                description={appointment.description}
                                status={appointment.status}
                                handleAppointmentCancel={handleAppointmentCancel}
                            />
                        ))}
                    </div>
                ) : (
                    <h2 className={styles.noAppointments}>Aún no tienes reservas...</h2>
                )
            }
        </div>
    );
}
