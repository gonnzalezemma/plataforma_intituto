const router = require("express").Router();

const { body, check } = require("express-validator");
const { validar_jwt } = require("../middlewares/validar_jwt");
const { ExisteEmail } = require("../helpers/validaciones.help");


const { 
    validarRutaLogin,
    validarCreateUser,
    validarEditUserAdm,
    validarEditUserUser,
    validarDeleteUser

} = require("../middlewares/validaciones");
//controllers
const {
  createUser,
  rutaLogin,
  rutaDelete,
  rutaGet,
  rutaPutUsers,
  rutaEditUser,
} = require("../controllers/user.controllers");

//route login puede ser el mismo para todos los usuarios
router.post(
  "/login/usuarios",
  validarRutaLogin,
  rutaLogin
);

//route add user
router.post("/usuarios/create-user",
  
  //? validar datos
  validarCreateUser,
  //* validar token
  validar_jwt,
  //? Controller
  createUser
  );
  
  //route edit user for admin
router.put("/usuarios/edit-user/",

    //? validar datos
    validarEditUserAdm,

    validar_jwt,
    rutaPutUsers
  );

//route edit dni password user
router.put("/usuarios/edit-user", 
validar_jwt,
//? validar edit user/user
validarEditUserUser,
 rutaEditUser);

//route logical delete user
router.delete("/usuarios/delete-user/:id",

validar_jwt, 
//? validar delete user/user
validarDeleteUser,

rutaDelete);

//ver usuarios
router.get("/usuarios/get-user", validar_jwt, rutaGet);

module.exports = router;
