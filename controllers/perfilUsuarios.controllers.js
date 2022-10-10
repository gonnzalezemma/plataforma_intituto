const ctrlPerfilUsuarios={};


const Perfil =require('../models/perfiluser');
const Materias =require('../models/materias');


//TODO:controlador para agregar datos
 /**     
//* NORMAL
//**IMPO
*!ERROR
*? QUESTION
//TODO:controlador para agregar


*/






ctrlPerfilUsuarios.agregarDatos = async(req, res)=>{
    const {nombre,apellido,celular,direccion, carrera, materias}=  req.body;

    const usuario= req.usuario;

    const perfilUsario = await Perfil.find()
    
    perfilUsario.forEach(e => {

        if(e.userId===usuario.id){
            
            return res.json({ msg:"ya existe user"})
        }
    });  
    
    if(usuario.status=== false){
        
    return  res.status(404).json({
            msg:"user inactivo"
        });
        
    }


  


    var arrayMaterias=[];





    for (let i = 0; i < materias.length; i++) {
        
        const materia = materias[i];
        

        const objectMateria= await Materias.findOne({nombreMateria:materia})

        if (!objectMateria){
            res.status(404).json({msg:`materia no found ${materia}`})
        }


        arrayMaterias = ([...arrayMaterias,
            {
            materia:objectMateria
        } 
        
    ])

    }


    const infoUser= new Perfil({userId:usuario, nombre:nombre, apellido:apellido, celular:celular,direccion:direccion, carrera:carrera, materias:arrayMaterias})

    
    await infoUser.save();
    
     return res.status(200).json({success:true, message:"perfil creado satisfactoriamente", infoUser}, 
    );

}



//mostrar informacion de usuario
ctrlPerfilUsuarios.rutaMostrarInformacion = async(req,res)=>{

    
    const {id} = res.params;



    const perfilUsuario = await Perfil.findOne(id)


    return res.status(200).json(perfilUsuario);
}


ctrlPerfilUsuarios.editarPerfil = async(req, res)=>{
    const {nombre,apellido,celular,direccion, carrera, materias}=  req.body;
    
    const usuario= req.usuario;
    

  
    const buscarPerfil = await Perfil.find({userId:usuario.id})
  
    if(!buscarPerfil){
        return res.status(404).json({msg:"No existe Perfil"})
    }


   const idPerfil = buscarPerfil[0]._id 

    
 
  

    var arrayMaterias=[];


    for (let i = 0; i < materias.length; i++) {
        
        const materia = materias[i];
        

        const objectMateria= await Materias.findOne({nombreMateria:materia})

        if (!objectMateria){
           return res.status(404).json({msg:`materia no found ${materia}`})
        }


        arrayMaterias = ([...arrayMaterias,
            {
            materia:objectMateria
        } 
        
    ])

    }
    
    await Perfil.findByIdAndUpdate(idPerfil,{userId:usuario, nombre:nombre, apellido:apellido, celular:celular,direccion:direccion, carrera:carrera, materias:arrayMaterias});
    
   return res.status(201).json({
        msg:"usuario Actualizado satisfactoriamente"
    })
    
};



module.exports = ctrlPerfilUsuarios;