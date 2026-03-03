import Imagen2 from "../../assets/Logo.png";
import styles from "./HairCutCard.module.css";
import { Link } from "react-router-dom";

export default function HairCutCard() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>¡Bienvenido a MarceCroft BarberShop!</h1>
            <div className={styles.imageWrapper}>
                <img src={Imagen2} alt="Logo Barbería" />
            </div>
            <h2 className={styles.slogan}>“Estilo que marca la diferencia”</h2>
            <p className={styles.description}>
                Disfruta de un corte moderno, fresco y juvenil en un ambiente pensado
                para ti.
            </p>
            <h3 className={styles.invite}>Elige cómo quieres continuar</h3>
            <div className={styles.actions}>
                <Link to="/register">
                    <button className={`${styles.button} ${styles.primary}`}>
                        Registrarse
                    </button>
                </Link>
                <Link to="/login">
                    <button className={styles.button}>Iniciar Sesión</button>
                </Link>
                <Link to="/home">
                    <button className={styles.button}>Ingresar como Invitado</button>
                </Link>
            </div>
        </div>
    );
}
