

import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import style from "./index.module.css";

function BodyCategoryDelete({
  categoryDelete,
  categoryId,
  abrirCerrarModalDeleteCategory,
}) {
  return (
    <div className={style.modal} style={{ border: "3px solid red" }}>
      <h3>Desea eliminar la categoria {categoryId}?</h3>
      <p>La categoria se elimina para siempre con todas sus subcategorias y con todos sus Productos correspodientes no se podrán recuperar</p>

      <div align="right">
        <Button color="secondary" onClick={() => categoryDelete()}>
          ELIMINAR
        </Button>
        <Button onClick={() => abrirCerrarModalDeleteCategory()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default BodyCategoryDelete;