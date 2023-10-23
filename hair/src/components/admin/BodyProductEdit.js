import React from 'react'
import { Modal, Button, TextField } from '@material-ui/core';
import style from './index.module.css';

const BodyProductEdit = ({ idProducto, productEdit, handleChangeProduct, productPost, abrirCerrarModalInsertarProduct, abrirCerrarModalProduct, abrirCerrarModalImgProduct }) => {


    return (

        <div className={style.modal}>

            <h3>Editar Producto</h3>
            <div align="right">
                <Button onClick={() => abrirCerrarModalImgProduct()} className={style.btnImg}>Editar Imagenes</Button>
            </div>
            <TextField value={productEdit.nombre} name="nombre" className={style.inputMaterial} label="Nombre" onChange={handleChangeProduct} />
            <br />
            <TextField value={productEdit.precio} type='Number' name="precio" className={style.inputMaterial} label="Precio" onChange={handleChangeProduct} />
            <br />
            <TextField value={productEdit.descripcion} name="descripcion" className={style.inputMaterial} label="Descripción" onChange={handleChangeProduct} />
            <br />
            <TextField value={productEdit.stock} type='Number' name="stock" className={style.inputMaterial} label="Stock" onChange={handleChangeProduct} />
            <br /><br />

            <div align="right">
                <Button color="primary" onClick={() => productPost(idProducto)}>Guardar Cambios</Button>
                <Button onClick={() => abrirCerrarModalProduct()}>Cancelar</Button>
            </div>
        </div>

    )
}

export default BodyProductEdit