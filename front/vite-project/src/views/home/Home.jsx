import styles from "./Home.module.css";
import Imagen from "../../assets/Imagen.png";

export default function Landing() {
    return (
        <div className={styles.landingContainer}>
            <section className={styles.hero}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>
                        Bienvenido/a a <span>MarceCroft BarberShop</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Una barbería donde la pasión por el estilo se encuentra con la
                        aventura. Inspirados en Tomb Raider, mezclamos cortes modernos
                        con una vibra única.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={Imagen} alt="MarceCroft" className={styles.heroImage} />
                </div>
            </section>
            <section className={styles.story}>
                <h2>Nuestra Historia</h2>
                <p>
                    Este proyecto nació de un sueño compartido: tener nuestra propia
                    barbería. Mi pareja, gran fan de Tomb Raider, siempre quiso
                    fusionar esa energía aventurera con el arte de los cortes. Así
                    nació <strong>MarceCroft BarberShop</strong>: un lugar donde cada
                    cliente vive una experiencia diferente, épica y personalizada.
                </p>
            </section>
            <section className={styles.cta}>
                <h2>¿Listo para tu próxima aventura?</h2>
                <p>Reserva tu turno y transforma tu estilo con nosotros.</p>
            </section>
        </div>
    );
}
