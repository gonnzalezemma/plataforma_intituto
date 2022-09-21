const router = require('express').Router();


const {validar_jwt} =require('../middlewares/validar_jwt')

//controllers 
const {
    tomarAsistencia
}= require('../controllers/asistencia.constrollers')



//router.post('/asistencia',rutaMostrarInformacion)

//route add user information with token 
router.post('/asistencia',tomarAsistencia)




module.exports=router;