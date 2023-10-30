import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";
function BodyCategoryEdit({
  idCategory,
  categoryPut,
  handleChangeCategoryEdit,
  openCloseModalCategory,
  categoryPost,
}) {
  return (
    <div className={style.modal}>
      <h3>Editar Producto</h3>

      <TextField
        value={categoryPut.nombre}
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangeCategoryEdit}
      />
      <br />

      <TextField
        value={categoryPut.descripcion}
        name="descripcion"
        className={style.inputMaterial}
        label="Descripción"
        onChange={handleChangeCategoryEdit}
      />
      <br />

      <div align="right">
        <Button color="primary" onClick={() => categoryPost(idCategory)}>
          Guardar Cambios
        </Button>
        <Button onClick={() => openCloseModalCategory()}>Cancelar</Button>
      </div>
    </div>
  );
}

export default BodyCategoryEdit;
