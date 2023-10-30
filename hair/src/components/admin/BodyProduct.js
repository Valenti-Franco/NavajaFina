import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";

const BodyProduct = ({
  handleChangeProduct,
  subCategoryPost,
  abrirCerrarModalInsertarProduct,
}) => {
  return (
    <div className={style.modal}>
      <h3>Agregar un Nuevo Producto</h3>
      <TextField
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangeProduct}
      />
      <br />
      <TextField
        type="Number"
        name="categoryId"
        className={style.inputMaterial}
        label="Categoria Id"
        onChange={handleChangeProduct}
      />
      <br />
      <TextField
        type="Number"
        name="subcategoryId"
        className={style.inputMaterial}
        label="SubCategoria Id"
        onChange={handleChangeProduct}
      />
      <br />
      <TextField
        type="Number"
        name="precio"
        className={style.inputMaterial}
        label="Precio"
        onChange={handleChangeProduct}
      />
      <br />
      <TextField
        name="descripcion"
        className={style.inputMaterial}
        label="Descripción"
        onChange={handleChangeProduct}
      />
      <br />
      <TextField
        type="Number"
        name="stock"
        className={style.inputMaterial}
        label="Stock"
        onChange={handleChangeProduct}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => subCategoryPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertarProduct()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default BodyProduct;
