import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";

function BodySubCategoryEdit({
  idsubCategory,
  subCategoryEdit,
  handleChangesubCategory,
  subCategoryPost,
  abrirCerrarModalEditsubCategory,
}) {
  return (
    <div className={style.modal}>
      <h3>Editar Producto</h3>
      <div align="right">
        <Button
          onClick={() => abrirCerrarModalEditsubCategory()}
          className={style.btnImg}
        >
          Editar Imagenes
        </Button>
      </div>
      <TextField
        value={subCategoryEdit.nombre}
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangesubCategory}
      />
      <br />

      <br />
      <br />

      <div align="right">
        <Button color="primary" onClick={() => subCategoryPost(idsubCategory)}>
          Guardar Cambios
        </Button>
        <Button onClick={() => abrirCerrarModalEditsubCategory()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default BodySubCategoryEdit;
