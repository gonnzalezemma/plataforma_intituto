const router = require('express').Router();


const {validar_jwt} =require('../middlewares/validar_jwt')

//controllers 
const {
    tomarAsistencia,
    mostrarAsistenciasAlumno,
    mostrarAsistencia
}= require('../controllers/asistencia.constrollers')



/* 
La asistencia tiene que ser tomada unicamente por el administrativo. 


*/
router.post('/asistencia',tomarAsistencia)

router.get('/asistencia',validar_jwt,mostrarAsistenciasAlumno)

router.get('/asistencia/date',mostrarAsistencia)




module.exports=router;