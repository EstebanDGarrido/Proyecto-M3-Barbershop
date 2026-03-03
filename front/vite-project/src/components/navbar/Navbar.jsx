import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "../../assets/Avatar.png";
import Logo from "../../assets/Logo.png";
import styles from "./Navbar.module.css";
import { getUserIdFromLocalStorage } from "../../helpers/actualUser"

export default function Navbar() {
    const navigate = useNavigate();
    const userId = getUserIdFromLocalStorage()
    const handleLogout = () => {
        const confirmed = window.confirm("¿Desea cerrar sesión?");
        if (confirmed) {
            localStorage.removeItem("actualUser");
            navigate("/");
        }
    }
    return (
        <nav className={styles.container}>
            <div className={styles.logoSection}>
                <img src={Logo} alt="Logo" />
            </div>
            <div className={styles.linkSection}>
                <NavLink to="/home" style={({ isActive }) => isActive ? { color: "orange" } : null}>
                    <span>HOME</span>
                </NavLink>
                {userId && (
                    <NavLink to="/appointments" style={({ isActive }) => isActive ? { color: "orange" } : null}>
                        <span>RESERVAS</span>
                    </NavLink>
                )}
                {userId && (
                    <NavLink to="/appointmentform" style={({ isActive }) => isActive ? { color: "orange" } : null}>
                        <span>NUEVA RESERVA</span>
                    </NavLink>
                )}
                <NavLink to="/about" style={({ isActive }) => isActive ? { color: "orange" } : null}>
                    <span>ABOUT</span>
                </NavLink>
                <NavLink to="/contact" style={({ isActive }) => isActive ? { color: "orange" } : null}>
                    <span>CONTACTO</span>
                </NavLink>
                {
                    userId ?
                        <span onClick={handleLogout}>SALIR</span>
                        :
                        <Link to="/login">
                            <span>INGRESAR</span>
                        </Link>
                }
            </div>
            <div className={styles.avatarSection}>
                <img src={Avatar} alt="Avatar" />
            </div>
        </nav>
    );
};
