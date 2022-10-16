const router = require("express").Router();


const { validar_jwt } = require("../middlewares/validar_jwt");


//todo|| Validaciones
const { 
  validarVerPerfil,
  validarAgregarInformacionyEdit,

 } = require("../middlewares/validaciones")
//controllers
const {
  rutaMostrarInformacion,
  agregarDatos,
  editarPerfil
} = require("../controllers/perfilUsuarios.controllers");

router.get("/perfil/:id",
 validar_jwt,
 //?-express-validator
validarVerPerfil,
//*controller
 rutaMostrarInformacion);

//route add user information with token
router.post("/usuarios/agregar-info/", 
validar_jwt,
//? -express-validator
validarAgregarInformacionyEdit,
//*controller
agregarDatos);

//route edit user information with token
router.put("/usuarios/edit-info/",
 validar_jwt, 
 validarAgregarInformacionyEdit,
 editarPerfil);




module.exports = router;
