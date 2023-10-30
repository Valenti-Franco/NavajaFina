import React from 'react'
import { Modal, Button, TextField } from '@material-ui/core';
import style from './index.module.css';

const BodyDeleteUser = ({ abrirCerrarModalDeleteUsuario, usuarioDelete, usuarioId }) => {

    return (

        <div className={style.modal} style={{ border: "3px solid red" }}>
            <h3>Desea eliminar Usuario {usuarioId}?</h3>
            <p>El Producto se elimina para siempre y no se podrá recuperar</p>

            <div align="right">

                <Button color="secondary" onClick={() => usuarioDelete()} >ELIMINAR</Button>
                <Button onClick={() => abrirCerrarModalDeleteUsuario()}>Cancelar</Button>
            </div>
        </div>

    )
}

export default BodyDeleteUser