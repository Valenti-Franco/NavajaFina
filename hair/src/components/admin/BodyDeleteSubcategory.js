import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";

function BodyDeleteSubcategory({
  subCategoryDelete,
  subCategoryId,
  abrirCerrarModalDeletesubCategory,
}) {

  // console.log(subCategoryId)
  return (
    <div className={style.modal} style={{ border: "3px solid red" }}>
      <h3>Desea eliminar la subcategoria {subCategoryId}?</h3>
      <p>La subcategoria se elimina para siempre con todos sus productos y no se podrá recuperar</p>

      <div align="right">
        <Button color="secondary" onClick={() => subCategoryDelete()}>
          ELIMINAR
        </Button>
        <Button onClick={() => abrirCerrarModalDeletesubCategory()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default BodyDeleteSubcategory;
