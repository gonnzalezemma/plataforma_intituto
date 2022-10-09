const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')

const {ExisteEmail} = require('../middlewares/validar_email')

//controllers 
const {
    createMateria,      //? Add materia POST
    agregarNotas,       //?Add notas PUT
    editarNotasUser,    //? edit nota usuario for profesor PUT
    editMateria,        //? PUT materia Admin
    showMateria,        //! Show materia for id  GET
    showAlumNotas,    //! Show notas por alumno  GET
    showNotasProf,     //! Show notas por profesor GET
    /*
    * * FALTA */
}= require('../controllers/materias.controllers')

//? Add materia admin
router.post('/materia/',validar_jwt, createMateria)

//? Edit materia admin
router.put('/materia/:id',validar_jwt, editMateria)


//?Add notas 
router.put('/add/notas/:id',validar_jwt, agregarNotas)

//? edit nota usuario for profesor 
router.put('/edit/notas/:id',validar_jwt, editarNotasUser)

 
//? Show materia for id 
router.get('/materia/:id',validar_jwt, showMateria)



//? Show todas las notas de todas las materias del alumno
router.get('/materias/notas',validar_jwt, showAlumNotas)


//? Show notas de materias que da el profesor
router.get('/materias/profesor',validar_jwt, showNotasProf)


module.exports=router;