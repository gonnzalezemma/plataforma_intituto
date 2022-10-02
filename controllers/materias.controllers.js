const ctrlMaterias={};

const Materias =require('../models/materias');
const Usuario =require('../models/users');
//const bcryptjs = require('bcryptjs');
//const {generate_jwt}= require('../helpers/generate_jwt')

//route show users


//crear maeria
ctrlMaterias.createMateria = async(req, res)=>{

    const {nombreMateria, dniProfesores, horarioDesde, horarioHasta}=  req.body;
    const usuario= req.usuario;

    const MATERIA = Materias.findOne({nombreMateria:nombreMateria});

    
    if(usuario.role!="admin"){
        //no da permisos
    }
    if(MATERIA){
        //Materia  ya existe
        
    }
    
    for (let i = 0; i < dniProfesores.length; i++) {
        
        const profesor = dniProfesores[i];
        

        const objectProfesores = await Usuario.findOne({dni:profesor})

        var arrayProfesores = ([...arrayProfesores,
            {
            objectProfesores
        } 
    ])
    }


    
    const materias = new Materias({nombreMateria:nombreMateria, profesores:arrayProfesores, horarioDesde:horarioDesde, horarioHasta:horarioHasta});

    await materias.save();
}

ctrlMaterias.agregarNotas = async(req, res)=>{

    const busqueda={
        dniAlumno,primerParcial, segundoParcial, tercerParcial
    }=  req.body;


    const {id}= req.params; //id de materias 

    
    for (let i = 0; i < busqueda.length; i++) {
        
        const dniAlumno = busqueda.dniAlumno[i];
        const primerParcial = busqueda.primerParcial[i];
        const segundoParcial = busqueda.segundoParcial[i];
        const tercerParcial = busqueda.tercerParcial[i];
        
        const objectAlumno = await Usuario.findOne({dni:dniAlumno})


        var arrayNotas = ([...arrayNotas,
            {
            objectAlumno,primerParcial, segundoParcial, tercerParcial
        } 
    ])
    }


    const materias = await Materias.findByIdAndUpdate(id,{notas:arrayNotas})

    
    await materias.save();

}


module.exports = ctrlMaterias;