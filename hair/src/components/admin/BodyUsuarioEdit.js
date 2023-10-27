import React from 'react'
import { Modal, Button, TextField } from '@material-ui/core';
import style from './index.module.css';

const BodyUsuarioEdit = ({ idUsuario, usuarioEdit, usuarioPutEditor, usuarioPutAdmin, abrirCerrarModalUsuario }) => {

    // console.log(usuarioEdit)
    return (

        <div className={style.modal}>

            <h3>Editar Role Usuario</h3>
            <div align="right">

            </div>
            <TextField value={usuarioEdit.role} name="role" className={style.inputMaterial} label="Role" />

            <br /><br />

            <div align="right">
                <Button color="primary" onClick={() => usuarioPutEditor(idUsuario)}>EDITOR</Button>
                <Button color="secondary" onClick={() => usuarioPutAdmin(idUsuario)}>ADMIN</Button>
            </div>
            <Button onClick={() => abrirCerrarModalUsuario()}>Cancelar</Button>
            {/* </div> */}
        </div >

    )
}

export default BodyUsuarioEdit