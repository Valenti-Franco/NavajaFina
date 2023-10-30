import React, { useEffect, useState } from 'react'
import style from './index.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';




const VerificarTokenEmail = () => {
    const { token } = useParams();
    const postTransactionPaypal = async () => {
        const apiUrl = `https://tpibarbershop20231015224614.azurewebsites.net/api/Usuarios/VerificarEmail?token=${token}`;
        try {
            const response = await axios.post(apiUrl); // Si necesitas enviar datos en el cuerpo, agrega el segundo argumento aquí
            setVerificationMessage('Token verificado Correctamente');
            setResponseMessage("Su pago se ha realizado");
        } catch (error) {
            setVerificationMessage('Error al verificar el token');
            setResponseMessage(error.message);
            console.error(error);
        }
    };
    
    useEffect(() => {
        postTransactionPaypal();
    }, []);  // Asegúrate de importar useEffect de React
    
    const [verificationMessage, setVerificationMessage] = useState('Verificando token');
    const [responseMessage, setResponseMessage] = useState('');
    return (
   
        <div className={style.mainToken}>
            <h1 style={{ textAlign: "center" }}>{verificationMessage}</h1>
            <h1 style={{ textAlign: "center" }}>Respuesta: {responseMessage}</h1>
            <Link to="/" className={style.btnVolver}>VOLVER</Link>
        </div>
        
    
  )
 

}

export default VerificarTokenEmail
