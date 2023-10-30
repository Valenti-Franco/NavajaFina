// import { Button, TextField } from '@mui/material/core'
import { Modal, Button, TextField, Card } from '@material-ui/core';

import React, { useState } from 'react'
import style from './index.module.css';

const BodyBuyProduct = ({ idProducto, setCantidad, cantidad, compraPost, abrirCerrarModalBuy, productoPrecio }) => {
    // console.log(productoPrecio)

    const handleChangeCantidad = (event) => {
        const value = event.target.value;

        if (value === '' || (parseFloat(value) > 0 && parseFloat(value) <= 5)) {
            setCantidad(value);
        }
    };

    return (

        <div className={style.modal}>

            <h3>Crear Reserva</h3>
            <h2>Precio : ${productoPrecio * cantidad}</h2>
            <br />
            <TextField type='Number' value={cantidad} name="cantidad" className={style.inputMaterial} label="Cantidad" onChange={handleChangeCantidad} />

            <br /><br />

            <div align="right">
                {/* onClick={() => productPost(idProducto)} */}
                <Button color="primary" onClick={compraPost} >Crear Reserva</Button>
                <Button onClick={() => abrirCerrarModalBuy()}>Cancelar</Button>
            </div>
        </div>

    )
}

export default BodyBuyProduct




