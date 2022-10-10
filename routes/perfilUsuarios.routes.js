const router = require("express").Router();

const { body, check } = require("express-validator");

const { validar_jwt } = require("../middlewares/validar_jwt");

const { ExisteEmail } = require("../middlewares/validar_email");

//controllers
const {
  rutaMostrarInformacion,
  agregarDatos,
  editarPerfil
} = require("../controllers/perfilUsuarios.controllers");

router.get("/perfil/:id", validar_jwt, rutaMostrarInformacion);

//route add user information with token
router.post("/usuarios/agregar-info/", validar_jwt, agregarDatos);

//route edit user information with token
router.put("/usuarios/edit-info/", validar_jwt, editarPerfil);




module.exports = router;
