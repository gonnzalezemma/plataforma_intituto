const { body, check } = require('express-validator');
const { ExisteEmail } = require('../middlewares/validar_email');
const {validar_campos} = require('../helpers/validar_campos');
const validarUser=[


    body('dni', 'El password ingresado no contiene un formato correcto')
   .isString()
   .not()
   .isEmpty()
   .isLength({ min: 3, max: 8}),
   
    body('tipoRole', 'El tipo ingresado no contiene un formato correcto')
   .isString()
   .not()
   .isEmpty()
   .isLength({ min: 1, max: 8}),
    validar_campos
]

const validarInformacion =[,
    body('nombre', 'El nombre ingresado contiene un formato incorrecto')
    .isString()
    .not()
    .isEmpty()
    ,
    body('apellido',' El apellido ingresado no contiene un formato correcto')
    .isString()
    .not()
    .isEmpty()
    ,
    body('celular',' El celular ingresado no contiene un formato correcto')
    .isString()
    .not()
    .isEmpty()
    ,
    
body('email', 'el correo ingresado no contiene un formato correcto')
    .isEmail()
    .not()
    .isEmpty()
    .custom(ExisteEmail)
    ,
    
    body('direccion','La direccion ingresado no contiene un formato correcto')
    .isString()
    .not()
    .isEmpty()
    ,
    
    body('carrera','La carrera ingresado no contiene un formato correcto')
    .isString()
    .not()
    .isEmpty()
    ,

]
module.exports = {
    validarUser
}