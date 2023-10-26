import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import style from './index.module.css';
import axios from 'axios';

const VerificarToken = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const compraId = searchParams.get('compraId');
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
    useEffect(() => {
        const postTransactionPaypalCompra = async () => {
            try {
                const response = await axios.post(
                    `https://tpibarbershop20231015224614.azurewebsites.net/Transaction/Compras?token=${token}&compraId=${compraId}`,
                    {},
                    config
                );
                // console.log(response)
                setVerificationMessage('Token verificado Correctamente');
                setResponseMessage("su pago se ha realizado ");
            } catch (error) {
                setVerificationMessage('Error al verificar el token');
                setResponseMessage(error.message);

                console.error(error);
            }
        };

        postTransactionPaypalCompra();
    }, [compraId, token]);

    return (
        <div className={style.mainToken}>
            <h1 style={{ textAlign: "center" }}>{verificationMessage}</h1>
            <h1 style={{ textAlign: "center" }}>Respuesta: {responseMessage}</h1>
            <Link to="/" className={style.btnVolver}>VOLVER</Link>
        </div>
    );
};

export default VerificarToken;
