const ctrlMaterias={};

const Materias =require('../models/materias');
//const bcryptjs = require('bcryptjs');
//const {generate_jwt}= require('../helpers/generate_jwt')

//route show users


//login admin
ctrlMaterias.createMateria = async(req, res)=>{

    const {dni, password}=  req.body;
    



    res.json({msg:" inicio de session exitoso"})

}


module.exports = ctrlMaterias;