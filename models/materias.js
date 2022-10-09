const {model, Schema}= require('mongoose');
const MarteriaShema = new Schema({

    nombreMateria:{
        type: String,
        required:true
    },
    profesores:[
        {
        profesor: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario'}
        }
    ],
    horarioDesde:{
        type: String,
        required:true
    },
    horarioHasta:{
        type: String,
        required:true
    },
    notas:
      [
          
          {
            alumno:{
                type:Schema.Types.ObjectId,
                ref: 'Usuario'
            },
          primerParcial:{
              type: Number,
              default:0
              
          },
          segundoParcial:{
              type: Number,
              default:0
          },
          tercerParcial:{
              type: Number,
              default:0
            }
        }
    
    ]
});

module.exports = model('Materia', MarteriaShema);