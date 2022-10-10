const router = require("express").Router();

const { body, check } = require("express-validator");

const { validar_jwt } = require("../middlewares/validar_jwt");

//const {ExisteEmail} = require('../middlewares/validar_email')

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

router.get("/materia/:id/publicacion/", validar_jwt, verPublicaciones);

router.post("/materia/:id/publicacion/", validar_jwt, agregarPublicacion);

router.put("/publicacion/:publicacion/comment", validar_jwt,addComment);

router.put("/publicacion/:publicacion", validar_jwt, eliminarPublicacion);




module.exports = router;
