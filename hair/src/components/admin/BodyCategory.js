import React from "react";
import { Modal, Button, TextField } from "@mui/material";
import style from "./index.module.css";

function BodyCategory({
  openCloseModalInsertCategory,
  categoryPost,
  handleChangeCategory,
}) {
  return (
    <div className={style.modal}>
      <h3>Agregar una nueva categoria</h3>
      <TextField
        name="nombre"
        className={style.inputMaterial}
        label="Nombre"
        onChange={handleChangeCategory}
      />
      <br />
      <TextField
        name="descripcion"
        className={style.inputMaterial}
        label="Descripción"
        onChange={handleChangeCategory}
      />
      <br />
      <TextField
        name="subcategory"
        className={style.inputMaterial}
        label="subcategory"
        onChange={handleChangeCategory}
      />
      <br />
      <TextField
        type="Number"
        name="subcategoryId"
        className={style.inputMaterial}
        label="SubCategoria Id"
        onChange={handleChangeCategory}
      />
      <br />
      <TextField
        type="date"
        name="fechaPublicado"
        className={style.inputMaterial}
        onChange={handleChangeCategory}
      />
      <br />

      <br />

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => categoryPost()}>
          Insertar
        </Button>
        <Button onClick={() => openCloseModalInsertCategory()}>Cancelar</Button>
      </div>
    </div>
  );
}

export default BodyCategory;
