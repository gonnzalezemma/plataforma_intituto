const router = require('express').Router();


const {validar_jwt} =require('../middlewares/validar_jwt')


//? validaciones
const { 
    validarAgregarMateria,
    validarEditMateria,
    validarAddNota,
    validarEditNotaAlumno,
    validarShowMateria
} = require("../middlewares/validaciones");
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
router.post('/materia/',
validar_jwt,
/* 
?express -validator
*validar crear materia
*/
validarAgregarMateria,
createMateria)

//? Edit materia admin
router.put('/materia/:id',
validar_jwt, 
/* 
?express -validator
*validar editarMateria
*/
validarEditMateria,
editMateria)


//?Add notas 
router.put('/add/notas/:id',
validar_jwt,
/* 
?express -validator
*validar agregar Nota 
*/
validarAddNota,
agregarNotas)

//? edit nota usuario for profesor 
router.put('/edit/notas/:id',
validar_jwt,
/* 
?express -validator
*validar editNota user
*/
validarEditNotaAlumno,
editarNotasUser)

 
//? Show materia for id 
router.get('/materia/:id',
validar_jwt,
/* 
?express -validator
*validar idMateria
*/
validarShowMateria,
showMateria)



//? Show todas las notas de todas las materias del alumno
router.get('/materias/notas',
validar_jwt,
/* 
?no es necesario validar mediante express validator
*/

showAlumNotas)


//? Show notas de materias que dadas el profesor
router.get('/materias/profesor',
validar_jwt,
/* 
?no es necesario validar mediante express validator
*/

showNotasProf)


module.exports=router;