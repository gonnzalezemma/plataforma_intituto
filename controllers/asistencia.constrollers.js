const ctrlAsistencia={};

const Asistencia =require('../models/asistencia');
const Usuario =require('../models/users')



ctrlAsistencia.tomarAsistencia = async(req, res)=>{

    const busqueda={
        asistencia,
        dniAlumno
    }=  req.body;
   console.log(busqueda)
    
    var datosAlumnos= [];
    for (let index = 0; index < busqueda.length; index++) {
        const dniAlumnos = busqueda[index].dniAlumno;
        const asistencias = busqueda[index].asistencia;
        

        const objectAlumno= await Usuario.findOne({dni:dniAlumnos})
        datosAlumnos = ([...datosAlumnos,{
            alumno:objectAlumno,
            asistencia:asistencias
        } ])
    }
    var currentDateObj = new Date();
    var numberOfMlSeconds = currentDateObj.getTime();
    var addMlSeconds = -(3*60) * 60000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

    const cargarAsistencia= new Asistencia({alumnos:datosAlumnos, fecha:newDateObj})


 await cargarAsistencia.save();


 

    res.json({msj: 'asistencia de alumnos es:',
            obj:cargarAsistencia,
            fecha:cargarAsistencia.fecha
        })


}

module.exports = ctrlAsistencia;