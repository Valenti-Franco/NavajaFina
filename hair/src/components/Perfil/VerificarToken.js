import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import style from './index.module.css';
import axios from 'axios';

const VerificarToken = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const compraId = searchParams.get('compraId');
    const ordenCompraId = searchParams.get('ordenCompraId');

    const token = searchParams.get('token');
    const PayerID = searchParams.get('PayerID');

    const [verificationMessage, setVerificationMessage] = useState('Verificando token');
    const [responseMessage, setResponseMessage] = useState('');
    const token1 = localStorage.getItem("_id");
    const config = {
        headers: {
            'Authorization': `Bearer ${token1}` // Agrega el token JWT en la cabecera de autorización
        }
    };
    const postTransactionPaypal = async (url, data) => {
        try {
            const response = await axios.post(url, data, config);
            setVerificationMessage('Token verificado Correctamente');
            setResponseMessage("Su pago se ha realizado");
        } catch (error) {
            setVerificationMessage('Error al verificar el token');
            setResponseMessage(error.message);
            console.error(error);
        }
    };
    useEffect(() => {
        if (compraId) {
            const apiUrl = `https://tpibarbershop20231015224614.azurewebsites.net/Transaction/Compras?token=${token}&compraId=${compraId}`;
            postTransactionPaypal(apiUrl, {});
        } else if (ordenCompraId) {
            const apiUrl = `https://tpibarbershop20231015224614.azurewebsites.net/Transaction/OrdenCompras?token=${token}&ordenCompraId=${ordenCompraId}`;
            postTransactionPaypal(apiUrl, {});
        }
    }, [compraId, ordenCompraId, token]);

    return (
        <div className={style.mainToken}>
            <h1 style={{ textAlign: "center" }}>{verificationMessage}</h1>
            <h1 style={{ textAlign: "center" }}>Respuesta: {responseMessage}</h1>
            <Link to="/" className={style.btnVolver}>VOLVER</Link>
        </div>
    );
};

export default VerificarToken;
