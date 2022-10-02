const ctrlUsuarios={};

const Usuario =require('../models/users');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt')

//seccion alumnos profesores

//ruta cambiar contraseña usuario: profesor y alumno
ctrlUsuarios.rutaPutPassword = async (req , res)=>{
    
    const { id } = req.params;
    /* dni:
    password: */
    const usuario = await Usuario.findByIdAndUpdate(id, {password});
    return res.json(usuario)
    
    
};

//edit user by user
ctrlUsuarios.rutaEditUser = async (req , res)=>{
    const {password} = req.body;
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
    
    const usuario = await Usuario.findByIdAndUpdate(id, {password});
    return res.json(usuario)

}


//Iniciar session usuario normal 
ctrlUsuarios.rutaLogin = async(req, res)=>{

    const {dni, password}=  req.body;

    const user =await Usuario.findOne({dni}) 

    
        if(!user){
            return res.status(401).json({
                mensaje:"No existe:",
                dni: dni
            })
        }
        console.log(user.active)
       
        if(!user.active){
            return res.status(401).json({
                mensaje:"No existe:",
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
 
        return res.status(401).json({
            mensaje:`error${error}`
        })
    
};
//Fin session alumnos profesores


//Sesion administrativos


//login admin
ctrlUsuarios.rutaLoginAdmin = async(req, res)=>{
    
    const {dni, password}=  req.body;
    const user =await Usuario.findOne({dni});
    
    if(!user){
        return res.status(401).json({
            message: 'No existe:',
            dni:dni
        })
    }
    if(!user.active){
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
    if(user.role!="admin"){
        return res.status(401).json({
            message: 'No tiene permisos porque su usuario tiene rol de: '+user.role,
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





//ruta administrador agrega usuarios:  contraseña por defecto es el dni

ctrlUsuarios.createUser = async (req,res)=>{
    //
    const {dni, tipoRole} = req.body;
    const admin = req.usuario

    const usuario = await Usuario.findOne({dni:dni})

    if (usuario){
         return res.status(401).json({                 
             message: 'Usuario ya existe'
       })
     }
    if (admin.role!="admin"){
         return res.status(401).json({                 
             message: 'no tiene permisos'
       })
     }


    //asigna los roles segun es necesario
    const user =new Usuario({dni:dni,password:dni,role:tipoRole});
    //se recomienda cambiar la contraseña despues de ingresar

    
    
    const salt = bcryptjs.genSaltSync();
    
    user.password = bcryptjs.hashSync(dni, salt)
    
    await user.save();
    
    res.json({msg: 'Usuario agregado'})
};

//ver usuarios admin
ctrlUsuarios.rutaGet = async (req,res)=>{
    const usuario = req.usuario;

    if(usuario!="admin"){
        return res.status(401).json({                 
            message: 'no tiene permisos'
      })
    }
    const user = await Usuario.find();
    
    res.json(user);
}




//ruta cambiar modeificar usuarios: profesor y alumno(modo admin)
ctrlUsuarios.rutaPutUsers = async (req , res)=>{
    
    const {dni,password, role} = req.body;
    const admin = req.usuario;

    if(admin !="admin"){
        return res.status(401).json({                 
            message: 'no tiene permisos'
      })
    }
    const usuario = await Usuario.findByIdAndUpdate(id, {dni,password, role});
    return res.json(usuario)
    
    
};


//ruta eliminar users
ctrlUsuarios.rutaDelete = async (req,res)=>{
    
    const {id} = req.params;
    
    const user =await Usuario.findByIdAndUpdate(id,{ active: false });
    
    
    //responde si fue eliminado correctamente
    
    return res.status(201).json({
        msg: "user removido logicamente", user
    })
}

module.exports = ctrlUsuarios;

