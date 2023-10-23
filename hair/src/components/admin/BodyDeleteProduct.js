import React from 'react'
import { Modal, Button, TextField } from '@material-ui/core';
import style from './index.module.css';

const BodyDeleteProduct = ({ abrirCerrarModalDeleteProduct, productDelete, productId }) => {

    return (

        <div className={style.modal} style={{ border: "3px solid red" }}>
            <h3>Desea eliminar el Producto {productId}?</h3>
            <p>El Producto se elimina para siempre y no se podrá recuperar</p>

            <div align="right">

                <Button color="secondary" onClick={() => productDelete()} >ELIMINAR</Button>
                <Button onClick={() => abrirCerrarModalDeleteProduct()}>Cancelar</Button>
            </div>
        </div>

    )
}

export default BodyDeleteProduct