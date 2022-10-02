const ctrlPerfilUsuarios={};


const Perfil =require('../models/perfiluser');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt')


//controlador para agregar datos
ctrlPerfilUsuarios.agregarDatos = async(req, res)=>{
    const {}=  req.body;
// FALTA RELACION populate
    const userId= req.usuario._id;

    const infoUser= new Perfil({})


await infoUser.save();
}

//mostrar informacion de usuario
ctrlPerfilUsuarios.rutaMostrarInformacion = async(req,res)=>{
   
    const perfilUsuario = await Perfil.findOne(id)

    res.json(perfilUsuario);
}
