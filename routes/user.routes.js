const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')
const {validarUser} = require('../middlewares/validarUser')
const {ExisteEmail} = require('../middlewares/validar_email')
//mirar que cambio ja
//controllers 
const {
    createUser,rutaLogin,rutaDelete,rutaGet,rutaPutUsers,rutaEditUser
}= require('../controllers/user.controllers')

//route login puede ser el mismo para todos los usuarios
router.post('/login/usuarios', rutaLogin)


//route add user
router.post('/usuarios/create-user',validar_jwt,createUser)

//route edit user for admin
router.put('/usuarios/edit-user/',validar_jwt,rutaPutUsers)

//route edit dni password user
router.put('/usuarios/edit-user/:id',validar_jwt,rutaEditUser)

//route logical delete user
router.delete('/usuarios/delete-user/:id',validar_jwt,rutaDelete)


//ver usuarios
router.get('/usuarios/get-user',validar_jwt,rutaGet)


module.exports=router;
