import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";

function BodySubCategory({
  handleChangesubCategory,
  subCategoryPost,
  abrirCerrarModalInsertarsubCategory,
}) {
  return (
    <div className={style.modal}>
      <h3>Agregar una Nueva Subcategoria</h3>
      <TextField
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangesubCategory}
      />
      <br />
      <TextField
        type="Number"
        name="categoryId"
        className={style.inputMaterial}
        label="Categoria Id"
        onChange={handleChangesubCategory}
      />
      <br />

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => subCategoryPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertarsubCategory()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default BodySubCategory;
