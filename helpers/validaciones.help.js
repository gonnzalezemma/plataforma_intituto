const validacionesHelper={}
const Perfil = require('../models/perfiluser');
const Usuario = require('../models/users');

validacionesHelper.ExisteEmail = async( req, res, next ) => {
    const {email}=  req.body;
    const emailEncontrado = await  Perfil.findOne({email:email});

    if(emailEncontrado){
        return res.status(401).json({
            message: 'Email ya esxiste',
            email:email
        })
    }
    next()
}

validacionesHelper.ValidarPassword= async (req, res, next)=>{
    const {password} = req.body
    const user= req.usuario;

    if(user.password === password){
        return res.status(401).json({                 
            message: 'La contraseña no puede ser igual a la actual'
      })
    }
    if(user.dni === password){
        return res.status(401).json({                 
            message: 'La contraseña no puede ser igual al dni'
      })
    }
    next()
}

validacionesHelper.validarExistenicaId= async (req, res, next)=>{
    const user = await Usuario.findOne({dni})
    if(!user){
        return res.status(401).json({
            message: 'No existe user inexistente'
        })
    }

    next()
}
module.exports = validacionesHelper;