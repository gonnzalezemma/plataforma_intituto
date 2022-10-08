const ctrlPerfilUsuarios={};

const Usuario = require('../models/users')
const Perfil =require('../models/perfiluser');
const Materias =require('../models/materias');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt')


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

    const userId= req.usuario.id;

    const usuario = await Usuario.findOne({_id:userId});




    for (let i = 0; i < materias.length; i++) {
        
        const materia = materias[i];
        

        const objectMateria= await Materias.findOne({nombreMateria:materia})

        var arrayCarreras = ([...arrayCarreras,
            {
            materias:objectMateria
        } 
    ])
    }

    arrayCarreras = ([...arrayCarreras,{
        carrera:carrera
    }])
    

    const infoUser= new Perfil({userId:usuario, nombre:nombre, apellido:apellido, celular:celular,direccion:direccion, carreras:arrayCarreras})


    await infoUser.save();


}
//ejemplo


//mostrar informacion de usuario
ctrlPerfilUsuarios.rutaMostrarInformacion = async(req,res)=>{

    
    const {id} = res.params;


    const perfilUsuario = await Perfil.findOne(id)

    res.json(perfilUsuario);
}


ctrlPerfilUsuarios.editarPerfil = async(req, res)=>{
    const {nombre,apellido,celular,direccion, carrera, materias}=  req.body;
    
    const userId= req.usuario.id;
    
    
    
    
    
    
    for (let i = 0; i < materias.length; i++) {
        
        const materia = materias[i];
        
        
        const objectMateria= await Materias.findOne({nombreMateria:materia})
        
        var arrayCarreras = ([...arrayCarreras,
            {
                materias:objectMateria
            } 
        ])
    }

    arrayCarreras = ([...arrayCarreras,{
        carrera:carrera
    }])
    
    const usuario = await Usuario.findByIdAndUpdate(userId,{userId:usuario, nombre:nombre, apellido:apellido, celular:celular,direccion:direccion, carreras:arrayCarreras});
    
    await infoUser.save();
    
    
};



module.exports = ctrlPerfilUsuarios;