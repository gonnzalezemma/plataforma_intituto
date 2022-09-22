const router = require('express').Router();


const {validar_jwt} =require('../middlewares/validar_jwt')

//controllers 
const {
    tomarAsistencia
}= require('../controllers/asistencia.constrollers')



/* 
La asistencia tiene que ser tomada unicamente por el administrativo. 


*/
router.post('/asistencia',tomarAsistencia)




module.exports=router;