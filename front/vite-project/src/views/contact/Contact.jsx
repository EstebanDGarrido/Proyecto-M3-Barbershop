import styles from "./Contact.module.css";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contact() {
    return (
        <div className={styles.container}>
            <h2>Contacto</h2>
            <p>
                Si deseas saber más sobre mi trabajo o colaborar en algún proyecto,
                puedes encontrarme en las siguientes plataformas:
            </p>
            <div className={styles.links}>
                <a
                    href="https://www.linkedin.com/in/estebandavidgarridovaldivia/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin /> LinkedIn
                </a>
                <a
                    href="https://github.com/EstebanDGarrido"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub /> GitHub
                </a>
            </div>
        </div>
    );
}
