import React, { useEffect } from 'react'
import error from "../../assets/error.png"
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/home")
        }, 5000);
        return () => clearTimeout(timeout);
    }, [navigate])
    return (
        <div>
            <h1>No hay nada aquí!</h1>
            <h2>404</h2>
            <h3>Serás redirigido a Home en 5 segundos...</h3>
            <img src={error} alt="404" />
        </div>
    )
}
