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
    
    const usuario = await Usuario.findByIdAndUpdate(id, {password});
    return res.status(201).json(usuario)

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
        res.status(200).json({msg:'inicio de session exitoso',
        token:token})
 
      
    
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
if(tipoRole!="admin" && tipoRole!="profesor" && tipoRole!="alumno" ){
    return res.status(401).json({                 
        message: 'No existe el tipo'
  })
}
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
    
   return res.json({msg: 'Usuario agregado'})
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


/* 
todo PUT
*ruta cambiar modeificar usuarios: profesor y alumno(modo admin)
 */
ctrlUsuarios.rutaPutUsers = async (req , res)=>{
    
    const {dni,password, role} = req.body;
    const user = req.usuario;

    if(user !="admin"){
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
    const usuario = req.usuario;
    
    if(id !== usuario.id ){
        return res.status(401).json({
            msg: 'no tiene permisos'
        })
    }
    
    if(!usuario.role === 'admin'){
        
        const user =await Usuario.findByIdAndUpdate(id,{ active: false });
        
        //? responde si fue eliminado correctamente
        return res.status(201).json({
            msg: "user removido logicamente", user
        })
    }

    if((usuario.role !== 'admin') && (id == usuario.id)){
        
        const user =await Usuario.findByIdAndUpdate(id,{ active: false });
        
        //? responde si fue eliminado correctamente
        return res.status(201).json({
            msg: "user removido logicamente", user
        })
    }
    
    return res.status(500).json({
        msg:"Internal server Error!"
    })
}

module.exports = ctrlUsuarios;

