const router = require("express").Router();


const { validar_jwt } = require("../middlewares/validar_jwt");

const { 
  validarVerPublicaciones, 
  validarAgregarPublicacion,
  validarAgregarComentario

 } = require("../middlewares/validaciones");

//controllers
const {
     /* 
  * get
? ver publicaciones de una materia
  */
  verPublicaciones,
  /*
?POST 
*Agrega publicaion 
  */
  agregarPublicacion,
  /* 
  !PUT 
  *elimina logicamente 
  */
  eliminarPublicacion,
  /* 
  *__________________
  todo PUT
  *add new comment in the post.
  */
  addComment,
} = require("../controllers/publicaciones.controllers");




router.get("/materia/:id/publicacion/", 
validar_jwt, 
//? express-validator
validarVerPublicaciones,
verPublicaciones);

router.post("/materia/:id/publicacion/",
 validar_jwt, 
 /* 
 ? express-validator 
 *validar verPublicaciones
 */
 validarAgregarPublicacion,
 
 agregarPublicacion);

router.put("/publicacion/:publicacion/comment",
 validar_jwt,
 /* 
 ? express-validator
 *validar comment publicacion 
 */
validarAgregarComentario,
 addComment);

router.put("/publicacion/:publicacion", validar_jwt, eliminarPublicacion);




module.exports = router;
