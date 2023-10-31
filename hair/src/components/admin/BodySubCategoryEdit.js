import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";

function BodySubCategoryEdit({
  idsubCategory,
  subCategoryEdit,
  handleChangesubCategory,

  abrirCerrarModalEditsubCategory,
  subcategoryPost
}) {
  console.log(subCategoryEdit)
  return (
    <div className={style.modal}>
      <h3>Editar SubCategoria</h3>
      <div align="right">

      </div>
      <TextField
        value={subCategoryEdit.nombre}
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangesubCategory}
      />
      <TextField
        value={subCategoryEdit.categoryId}
        name="categoryId"
        type="number"
        className={style.inputMaterial}
        label="Category Id"
        onChange={handleChangesubCategory}
      />
      <br />

      <br />
      <br />

      <div align="right">
        <Button color="primary" onClick={() => subcategoryPost(idsubCategory)}>
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
