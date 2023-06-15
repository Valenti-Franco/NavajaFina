import express from "express";
const router = express.Router();
import {
  registrar,
  autenticar,
  perfil,
} from "../controllers/usuarioController.js";




// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);
// router.get("/confirmar/:token", confirmar);
// router.post("/olvide-password", olvidePassword);
// router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil/:_id", perfil);

export default router;
