const validacion = {};
const { body, check,param } = require("express-validator");
const validar_campos = require("../helpers/validar_campos");

const {
  ExisteEmail,
  ValidarPassword,
  validarExistenicaId,
} = require("../helpers/validaciones.help");

validacion.validarRutaLogin = [
  body("dni", "El password ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 8 }),
  body("password", "El password ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 8 }),
];

validacion.validarCreateUser = [
  body("dni", "El password ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 8 }),

  body("tipoRole", "El tipo ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 8 }),
  validar_campos,
];

validacion.validarEditUserAdm = [
  body("dni", "El password ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 8 }),
  body("password", "El password ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 8 }),
  body("tipoRole", "El tipo ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 4, max: 8 }),
  validar_campos,
];
validacion.validarEditUserUser = [
  body("password", "El password ingresado no contiene un formato correcto")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 8 })
    .custom(ValidarPassword),

  validar_campos,
];

validacion.validarDeleteUser = [
  param("id", "Parametro ingresado incorrecto")
    .isMongoId()
    .custom(validarExistenicaId),
  validar_campos,
];

/* 
?Validar Route User
*user

*/

validacion.validarVerPerfil = [
  param("id", "Parametro incorrecto").isMongoId().not(),
];

validacion.validarAgregarInformacionyEdit = [
  body("nombre", "Nombre ingresado no cumple los parametros")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 10 }),
  body("apellido", "apellido ingresado no cumple los parametros")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 10 }),
  body("celular", "Celular ingresado no cumple los parametros")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 15 }),
  body("email", "Email ingresado incorrecto")
    .isEmail()
    .not()
    .isEmpty()
    .isLength({ min: 7, max: 35 })
    .custom(ExisteEmail),
  body("direccion", "Direccion ingresada incorreta")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 7, max: 35 }),
  body("materia", "Materia ingresada incorrecta")
  .isArray()
  .not()
  .isEmpty(),

  body("carrera", "Carrera ingresada no cumple el formato extablecido")
    .isEmail()
    .not()
    .isEmpty()
    .isLength({ min: 4, max: 25 }),
  validar_campos,
];

validacion.validarVerPublicaciones = [
  param("id", "Parametro ingresado no valido").isMongoId(),
  validar_campos,
];
validacion.validarAgregarPublicacion = [
  param("id", "Parametro no cumple con las condiciones establecidas")
  .isMongoId(),
  body("content", "Content ingresado no cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 500 }),
  validar_campos,
];
validacion.validarAgregarComentario = [
  param("publicacion", "parametro no cumple con los terminos").isMongoId,
  body("content", "Content ingresado no cumple con el formato establecido")
  .isString()
  .not()
    .isEmpty()
    .isLength({ min: 1, max: 200 }),
    validar_campos
  ];
  
  validacion.validarAgregarMateria = [
    body("nombreMateria","El nombre de la materia no cumple los parametros")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min:3,max:300}),
    body("dniProfesores", "El dato ingresado no tiene los parametro correcto")
    .isArray()
    .not()
    .isEmpty(),
    body("horarioDesde"," El horario no cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength({min:3, max:4}),
    body("horarioHasta"," El horario no cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength({min:3, max:4}),
    validar_campos
    
  ]
  
  validacion.validarEditMateria = [
    param("id","Parametro ingresado incorrecto")
    .isMongoId(),
    
    body("nombreMateria","El nombre de la materia no cumple los parametros")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min:3,max:300}),
    body("dniProfesores", "El dato ingresado no tiene los parametro correcto")
    .isArray()
    .not()
    .isEmpty(),
    body("horarioDesde"," El horario no cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength({min:3, max:4}),
    body("horarioHasta"," El horario no cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength({min:3, max:4}),
    validar_campos
    
  ]
  
  validacion.validarAddNota = [
    body("dniAlumno","No cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength(),
    body("primerParcial","No cumple con el formato establecido")
    .isInt(),
    body("segundoParcial","No cumple con el formato establecido")
    .isInt(),
    body("tercerParcial","No cumple con el formato establecido")
    .isInt(),
    validar_campos
    
  ]
  validacion.validarEditNotaAlumno = [
    body("dniAlumno","No cumple con el formato establecido")
    .isString()
    .not()
    .isEmpty()
    .isLength(),
    body("primerParcial","No cumple con el formato establecido")
    .isInt(),
    body("segundoParcial","No cumple con el formato establecido")
    .isInt(),
    body("tercerParcial","No cumple con el formato establecido")
    .isInt(),
    validar_campos
    
  ]
  validacion.validarShowMateria = [
    param("id", "No cumple con el formato establecido")
    .isMongoId(),
    validar_campos
  ]
  validacion.validarTomarAsistencia = [
  body("asistencia")
  .isArray()
  .not()
  .isEmpty(),
  body("dniAlumno")
  .isArray()
  .not()
  .isEmpty(),
  ]
  
  module.exports = validacion;
