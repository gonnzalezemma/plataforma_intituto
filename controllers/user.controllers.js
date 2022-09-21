const ctrlUsuarios={};

const Usuario =require('../models/users');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt')

//route show users


//login admin
ctrlUsuarios.rutaLoginAdmin = async(req, res)=>{

    const {dni, password}=  req.body;
    const user =await Usuario.findOne({dni})

    if(!user){
        return res.status(401).json({
            message: 'No existe:',
            dni:dni
        })
    }
    if(!user.activo){
        return res.status(401).json({
            message: 'No existe',
            dni:dni
        })
    }
    if(!user.role){
        return res.status(401).json({
            message: 'No tiene permisos',
            dni:dni
        })
    }
    //verify password
    const passwordTrue =bcryptjs.compareSync(password,user.password)
    if(!passwordTrue){
        return res.status(401).json({msg:"Password unvaliable"})
    }

    //token generator
    const token =await generate_jwt(user.id);

    res.json({msg:" inicio de session exitoso", token:token})

}


//Iniciar session
ctrlUsuarios.rutaLogin = async(req, res)=>{

    const {dni, password}=  req.body;

    const user =await Usuario.findOne({dni}) 
    
    if(!user){
        return res.status(401).json({
            mensaje:"No existe:",
            dni: dni
        })
    }
    console.log(user.activo)
   
    if(!user.activo){
        return res.status(401).json({
            mensaje:"No existe:1",
            dni: dni
        })
    }
     

//verificar contrasenia
    const passwordTrue = bcryptjs.compareSync(password,user.password)

    if(!passwordTrue){
        return res.status(401).json({msg:'contrasena invalida'})
    }

    //generar token
    const token = await generate_jwt(user.id);

    res.json({msg:'inicio de session exitoso',
              token:token})

};


//ruta agregar users
ctrlUsuarios.rutaPost = async (req,res)=>{
     
    const {dni, password} = req.body;

    const user =new Usuario({dni,password,role:"user"});
    
    //password salt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save();

    res.json({msg: 'Usuario agregado'})
};


//ver usuarios
ctrlUsuarios.rutaGet = async (req,res)=>{

    const user = await Usuario.find();

    res.json(user);
}


//ruta editar users
ctrlUsuarios.rutaPut = async (req , res)=>{

    const { id } = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, {dni, password});
        return res.json(usuario)


};


//ruta eliminar users
ctrlUsuarios.rutaDelete = async (req,res)=>{

    const {id} = req.params;

    const user =await Usuario.findByIdAndUpdate(id,{ activo: false });

    
    //responde si fue eliminado correctamente

    return res.status(201).json({
        msg: "user removido logicamente", user
    })
}

module.exports = ctrlUsuarios;