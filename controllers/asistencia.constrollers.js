const ctrlAsistencia = {};


const Asistencia = require("../models/asistencia");
const Usuario = require("../models/users");

ctrlAsistencia.tomarAsistencia = async (req, res) => {

const user = req.usuario;

if(user.role !=="admin"){

  res.status(401).json({
    msg:"No tiene los permisos requeridos"
  })
  
}


  const busqueda = { asistencia, dniAlumno } = req.body;
  
  const hoy = new Date().toISOString().slice(0, 10) 
 
  var datosAlumnos = [];

  const searchDate = await Asistencia.find({
    fecha: {
      $gt:new Date(hoy)
    }
});




if(searchDate.length = 0){

    return res.status(409).json({msg:`Ya se a enviado la asistencia del dia de hoy`})
}








  for (let i = 0; i < busqueda.length; i++) {
    const dniAlumnos = busqueda[i].dniAlumno;
    const asistencias = busqueda[i].asistencia;

    const objectAlumno = await Usuario.findOne({ dni: dniAlumnos });

    datosAlumnos = [
      ...datosAlumnos,
      {
        alumno: objectAlumno,
        asistencia: asistencias,
      },
    ];
  }
  var currentDateObj = new Date();
  var numberOfMlSeconds = currentDateObj.getTime();
  var addMlSeconds = -(3 * 60) * 60000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  const cargarAsistencia = new Asistencia({
    alumnos: datosAlumnos,
    fecha: newDateObj,
  });

  await cargarAsistencia.save();

  res.json({
    msj: "asistencia de alumnos es:",
    obj: cargarAsistencia,
    fecha: cargarAsistencia.fecha,
  });
};



ctrlAsistencia.mostrarAsistencia = async (req, res) => {
  const idAsistencia = req.params.id;

  const hoy = new Date().toISOString().slice(0, 10)


  console.log(hoy);
  const asistencia = await Asistencia.find({
    fecha: {
      $gt:new Date(hoy)
    }
});

  return res.status(200).json(asistencia);
};



ctrlAsistencia.mostrarAsistenciasAlumno = async (req, res) => {

    const user = req.usuario;
   
    const asistencia = await Asistencia.find();
    
    


    var asistenciasAlumno = [];
    
    asistencia.forEach(e => {
        e.alumnos.forEach(a => {


        if(a.alumno == user.id){


              const asistencia = {
                  alumno:a.alumno,
                  asistencia:a.asistencia,
              }

              asistenciasAlumno = [...asistenciasAlumno, {asistenciaAlumno:asistencia} ]
          
          
          } 

      })

        
    });
    const getAsistencia ={
        asistencia: asistenciasAlumno,
        clases: asistencia.length,
        faltas: (asistencia.length - asistenciasAlumno.length)
    }

    return res.status(200).json(getAsistencia);
  };
  



module.exports = ctrlAsistencia;
