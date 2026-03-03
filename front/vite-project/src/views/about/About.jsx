import styles from "./About.module.css";

export default function About() {
    const techLogos = [
        {
            src: "https://img.icons8.com/fluent/512/node-js.png",
            alt: "Node JS",
            href: "https://nodejs.org/en",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
            alt: "TypeScript",
            href: "https://www.typescriptlang.org/",
        },
        {
            src: "https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png",
            alt: "Express",
            href: "https://expressjs.com/",
        },
        {
            src: "https://vectorseek.com/wp-content/uploads/2024/07/TypeORM-Logo-Vector-Logo-Vector.svg-.png",
            alt: "TypeORM",
            href: "https://typeorm.io/",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
            alt: "PostgreSQL",
            href: "https://www.postgresql.org/",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            alt: "React",
            href: "https://react.dev/",
        },
        {
            src: "https://images.seeklogo.com/logo-png/29/3/react-router-logo-png_seeklogo-294311.png",
            alt: "React Router",
            href: "https://reactrouter.com/",
        },
        {
            src: "https://redux.js.org/img/redux.svg",
            alt: "Redux",
            href: "https://redux.js.org/",
        },
    ];
    return (
        <div className={styles.container}>
            <h2>Proyecto Integrador del Módulo 3</h2>
            <p><strong>Carrera:</strong> Desarrollo Full Stack - Henry</p>
            <p><strong>Cohorte:</strong> FullTime 65</p>
            <p>
                Este proyecto integrador forma parte del Módulo 3 de la carrera y tiene
                como objetivo aplicar los conocimientos adquiridos en un entorno práctico.
            </p>
            <p>
                <strong>Las tecnologías empleadas en su desarrollo incluyen:</strong>
            </p>
            <div className={styles.techLogos}>
                {techLogos.map((logo) => (
                    <a
                        key={logo.alt}
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={logo.src} alt={logo.alt} />
                    </a>
                ))}
            </div>
        </div>
    );
}
