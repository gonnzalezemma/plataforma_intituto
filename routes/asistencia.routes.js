const router = require('express').Router();


const {validar_jwt} =require('../middlewares/validar_jwt')

const { 
   validarTomarAsistencia, 

} = require("../middlewares/validaciones");

//controllers 
const {
    tomarAsistencia,
    mostrarAsistenciasAlumno,
    mostrarAsistencia
}= require('../controllers/asistencia.constrollers')



/* 
La asistencia tiene que ser tomada unicamente por el administrativo. 


*/
router.post('/asistencia',
validar_jwt,
/* 
? express -validator
*validar post asistencia
*/
validarTomarAsistencia,
tomarAsistencia)

router.get('/asistencia',
validar_jwt,

mostrarAsistenciasAlumno)

router.get('/asistencia/date',
/* 
!No es necesario validar con validator
*/
mostrarAsistencia)




module.exports=router;