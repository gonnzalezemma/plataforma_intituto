const ctrlPublicaciones={}; 

const Publicacion = require('../models/publicaciones');
const Materia     = require('../models/materias')



/* 
?  POST
*AGREGAR Comentario en materia 
*/
ctrlPublicaciones.agregarPublicacion = async (req, res)=>{
const {content} = req.body;
const idMateria = req.params.id;
const usuario = req.usuario;
const materia = await Materia.findById(idMateria);


if (!materia){

    return res.status(403).json({msg:"no existe materia"})

}



const postPublicacion = new Publicacion({idMateria:idMateria, author:usuario, content:content})


await postPublicacion.save();
return res.status(200).json({
    postPublicacion
})

}

ctrlPublicaciones.verPublicaciones = async (req, res)=>{

const idMateria = req.params.id;

const user = req.usuario;

if(!user){
    return res.status(403).json({
        msg:"No tiene permisos"
    })
}





if(user.role!="alumno"){

    const posts= await Publicacion.findOne({idMateria:idMateria})


    return res.status(200).json({
        user:"admin/profe",
        posts
    })

}else{
    const posts= await Publicacion.findOne({idMateria:idMateria, active:true})

    return res.status(200).json({
        user:"alumno",
        posts
    })

}


}
/* 
!PUT
* elimina la poblicacion logicamente
*/

ctrlPublicaciones.eliminarPublicacion = async (req, res)=>{
    
    const idPublicacion = req.params.publicacion;
    
    const user = req.usuario;
    
    
    
    if(user.role!="admin" && user.role!="alumno" && user.role!="profesor"){
        
        return res.status(403).json({msg:"no tiene permisos"})
    }
    
    
    const publicacion = await Publicacion.findById(idPublicacion)
    
 
    
    
    
    if(user.role==="alumno" && publicacion.author!=user.id){
        
        return res.status(403).json({msg:"No tiene permisos"})
        
        
    }else if(user.role==="alumno" || publicacion.author===user.id){
        
        
        await Publicacion.findByIdAndUpdate(idPublicacion,{ active:false})
        
        return res.status(201).json({
            msg:"Publicacion updated successfully"
        })
    }
    
    if(user.role != "alumno"){
        
        await Publicacion.findByIdAndUpdate(idPublicacion,{ active:false})
        
        return res.status(201).json({
            msg:"Publicacion updated successfully", 
            role:user.role,Publicacion
        }) 
    }
    
    res.status(500).json({status:"500",
    msg:"Internal Error!"})
}



ctrlPublicaciones.addComment = async (req, res)=>{

    
    const {content}=req.body;
    
    const user = req.usuario;

    const idPublicacion = req.params.publicacion;

    const publicacion = await Publicacion.findById(idPublicacion)


    if(!publicacion.active){
        return res.status(403).json({msg:"No tiene permisos"})
    }

    publicacion.comentarios.unshift({userId:user.id, content:content}) 

    await publicacion.save()

    return res.status(201).json(publicacion.comentarios)

}

3




module.exports = ctrlPublicaciones;