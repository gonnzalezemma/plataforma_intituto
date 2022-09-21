const {model, Schema}= require('mongoose');
const MarteriaShema = new Schema({

    nombreMateria:{
        type: String,
        required:true
    },
    profesores:[
        
        {
        type:Schema.Types.ObjectId,
        required:true}
    ],
    horarioDesde:{
        type: String,
        required:true
    },
    horarioHasta:{
        type: String,
        required:true
    },
    notas:{
      
        primerParcial:{
            type: Number,
            
        },
        segundoParcial:{
            type: Number,
            
        },
        tercerParcial:{
            type: Number,
        }
    },

});

module.exports = model('Materia', MarteriaShema);