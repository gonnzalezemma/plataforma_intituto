const ctrlMaterias = {};

const Materias = require("../models/materias");
const Usuario = require("../models/users");

//crear maeria
ctrlMaterias.createMateria = async (req, res) => {
  const { nombreMateria, dniProfesores, horarioDesde, horarioHasta } = req.body;
  const usuario = req.usuario;

  const MATERIA = await Materias.findOne({ nombreMateria: nombreMateria });

  var arrayProfesores = [];

  if (usuario.role != "admin") {
    //no da permisos
    return res.status(403).json({ err: "no tiene permisos" });
  }

  if (MATERIA) {
    //Materia  ya existe

    return res.json({ msj: `${nombreMateria} ya esxiste` });
  }

  for (let i = 0; i < dniProfesores.length; i++) {
    const profesor = dniProfesores[i].dni;

    const objectProfesores = await Usuario.findOne({ dni: profesor });

    arrayProfesores = [
      ...arrayProfesores,
      {
        profesor: objectProfesores,
      },
    ];
  }

  const materias = new Materias({
    nombreMateria: nombreMateria,
    profesores: arrayProfesores,
    horarioDesde: horarioDesde,
    horarioHasta: horarioHasta,
  });

  await materias.save();

  res.status(201).json({ materias });
};

/* 
TODO PUT
agregar notas materia por profesor
 */
ctrlMaterias.agregarNotas = async (req, res) => {
  const busqueda = ({
    dniAlumno,
    primerParcial,
    segundoParcial,
    tercerParcial,
  } = req.body);

const user = req.usuario;

if(user!="profesor"){

  res.status(403).json({ msg:"No tiene permisos"});
}

  var arrayNotas = [];
  const { id } = req.params; //id de materias

  
  for (let i = 0; i < busqueda.length; i++) {
    const dniAlumno = busqueda[i].dniAlumno;
    const primerParcial = busqueda[i].primerParcial;
    const segundoParcial = busqueda[i].segundoParcial;
    const tercerParcial = busqueda[i].tercerParcial;

    const objectAlumno = await Usuario.findOne({ dni: dniAlumno });

    arrayNotas = [
      ...arrayNotas,
      {
        alumno: objectAlumno,
        primerParcial: primerParcial,
        segundoParcial: segundoParcial,
        tercerParcial: tercerParcial,
      },
    ];
  }

  await Materias.findByIdAndUpdate(id, { notas: arrayNotas });

  res.status(201).json({
    arrayNotas,
  });
};
/* 
TODO PUT
?edit notas 
 */
ctrlMaterias.editarNotasUser = async (req, res) => {
  const { dniAlumno, primerParcial, segundoParcial, tercerParcial } = req.body;

  const idMateria = req.params.id;
  const user = req.usuario; 

  if(user!="profesor"){

    res.status(403).json({message:"No tiene permisos"})
  }


  const materiaPopulate = await Materias.findById(idMateria).populate({
    path: "notas.alumno",
    select: "dni",
  });
  const materia = await Materias.findById(idMateria);

  const objetoAlumno = await Usuario.findOne({ dni: dniAlumno });

  var notas = materiaPopulate.notas;
  var notasMateria = materia.notas;

  const newNotasAlumno = {
    alumno: objetoAlumno,
    primerParcial: primerParcial,
    segundoParcial: segundoParcial,
    tercerParcial: tercerParcial,
  };

  delete notasMateria.find((e) => e.alumno.dni == objetoAlumno.dni);

  notasMateria = [...notasMateria, newNotasAlumno];

  const materiasSave = await Materias.findByIdAndUpdate(idMateria, {
    notas: notasMateria,
  });

  return res.status(200).json({
    materiaPopulate: materiaPopulate,
    notas: notas,
    materiaSave: materiasSave,
  });
};

/* 
? GET 
TODO MOSTAR MATERIAS
*/ 
ctrlMaterias.showMateria = async (req, res) => {
  const usuario = req.usuario;
  const Id = req.params.id;
  const Materia = await Materias.findById(Id);

  if (
    usuario.role != "admin" &&
    usuario.role != "profesor" &&
    usuario.role != "alumno"
  ) {
    return res.status(200).json({ success: "No tiene permisos" });
  }

  if (usuario.role == "profesor") {
    return res.status(200).json({ Materia });
  }

  if (usuario.role == "alumno") {
    const materiAlum = Materia.notas.find((e) => e.alumno == usuario.id);

    const ObjMateria = Materia;

    ObjMateria.notas = materiAlum;

    return res.status(200).json({ ObjMateria });
  }
};

/* 
 ? GET 
 TODO show todas las notas del alumno logueado 
 */
ctrlMaterias.showAlumNotas = async (req, res) => {
  /* 
    *  MOSTRA TODAS LAS NOTAS DE TODAS LAS MATERIAS DE LOS ALUMNOS
    */

  var notas = [];
  const usuario = req.usuario;
  const materias = await Materias.find();

  if (usuario.role != "alumno") {

    res.status(403).json({ Data: "no tiene permisos" });
 
  }

  materias.forEach((element) => {
    const notaAlumno = element.notas.find((e) => e.alumno == usuario.id);

    const notasMaterias = {
      materia: element.nombreMateria,
      profesores: element.profesores,
      horario: `Desde: ${element.horarioDesde} hasta: ${element.horarioHasta}`,
      nota: notaAlumno,
    };
    notas = [...notas, { materias: notasMaterias }];
  });

  res.status(200).json({ notas });
};

/* 
?GET
*Show notas de materias que dadas el profesor
*/
ctrlMaterias.showNotasProf = async (req, res) => {
  
  const user = req.usuario;
  const MATERIAS = await Materias.find().populate({
    path: "profesores.profesor",
    select: "dni",
  });

  if (user.role != "profesor") {
  
    res.status(403).json({ res: "no tiene permisos" });
  
  }
  var arrayMaterias = [];

  var count = 0;

  MATERIAS.forEach((e) => {
    var profe = e.profesores.find((e) => e.profesor === user.id);
    if (profe) {
      count = count + 1;

      var materiaProfesor = e;

      arrayMaterias = [...arrayMaterias, { MateriasProfe: materiaProfesor }];
    }
  });

  if (count < 1) {
    return res.status(204).json({ res: "No tiene materias" });
  }

  return res.status(200).json({
    profesor: user.dni,
    arrayMaterias,
  });
};
/* 
todo PUT
* edit materia for admin

 */
ctrlMaterias.editMateria = async (req, res) => {
  const { nombreMateria, dniProfesores, horarioDesde, horarioHasta } = req.body;
  const idMateria = req.params.id;
  const user = req.usuario;

  var arrayProfesores = [];

  if (user.role != "admin") {
    return res.status(403).json({
      msg: "no tiene permisos",
    });
  }

  if (dniProfesores) {
    for (let i = 0; i < dniProfesores.length; i++) {
      const profesor = dniProfesores[i].dni;

      const objectProfesores = await Usuario.findOne({ dni: profesor });

      if(!objectProfesores){
        return res.status(404).json({
          msg: "profesor not found",
        });
      }


      arrayProfesores = [
        ...arrayProfesores,
        {
          profesor: objectProfesores,
        },
      ];
    }

    const isUpdate = await Materias.findByIdAndUpdate(idMateria, {
      nombreMateria: nombreMateria,
      profesores: arrayProfesores,
      horarioDesde: horarioDesde,
      horarioHasta: horarioHasta,
    });
    return res.status(201).json({
      msg: "materia updated successfully",
      isUpdate,
    });
  }

  const materiasSave = await Materias.findByIdAndUpdate(idMateria, {
    nombreMateria: nombreMateria,
    profesores: dniProfesores,
    horarioDesde: horarioDesde,
    horarioHasta: horarioHasta,
  });

  return res.status(201).json({
    msg: "materia updated successfully",
    materiasSave,
  });
};

module.exports = ctrlMaterias;
