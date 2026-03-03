import styles from "./AppointmentCard.module.css";

export default function AppointmentCard({
    id,
    date,
    time,
    description,
    status,
    handleAppointmentCancel,
}) {
    const parsedDate = new Date(date);
    const formatDate = `${parsedDate.getDate() + 1} / ${parsedDate.getMonth() + 1} / ${parsedDate.getFullYear()}`;
    const isCancelable = (dateStr) => {
        const today = new Date();
        const appointmentDate = new Date(dateStr);
        return !(
            appointmentDate.getFullYear() === today.getFullYear() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getDate() === today.getDate()
        );
    };
    const handleClick = () => {
        if (
            window.confirm(`Desea cancelar el turno del día ${formatDate} a las ${time} hs ?`)
        ) {
            handleAppointmentCancel(id);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.date}>{formatDate}</div>
            <div className={styles.details}>
                <span>{time} Hs</span>
                <span>{description}</span>
            </div>
            <div className={styles.status}>
                {status === "active" ? (
                    isCancelable(date) ? (
                        <span className={styles.active} onClick={handleClick}>
                            Activo (Cancelar)
                        </span>
                    ) : (
                        <span className={styles.notCancelable}>
                            Activo (No se puede cancelar hoy)
                        </span>
                    )
                ) : (
                    <span className={styles.cancelled}>Cancelado</span>
                )}
            </div>
        </div>
    );
}
