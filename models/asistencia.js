const {model, Schema}= require('mongoose');
const AsistenciaShema = new Schema({
  
    alumnos:[
        {
            alumno:{
                type: Schema.Types.ObjectId,
                ref: 'Usuario'
            },
            asistencia:{
                type:Boolean,
                default:true,
                required:true,  
        }
    },
],
    fecha:{
       type:Date,
       required:true
    },
    active:{
        type:Boolean,
        required:true
    }
});

module.exports = model('Asistencia', AsistenciaShema);