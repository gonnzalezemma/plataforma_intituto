const {model, Schema}= require('mongoose');

const PerfilShema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
         ref: 'Materias'      },
         nombre:{
             type: String,
             required:true
             },
         apellido:{
             type: String,
             required:true
             },
         celular:{
             type: String,
             required:true
            },
         direccion:{
         type: String,
         required:true
                     
             },
         dni:{
             type: String,
             required:true
         },
         materias:[{
             type: Schema.Types.ObjectId,
             ref: 'Materias'            
         }],
         active:{
            type:Boolean,
            required:true
        }
});
module.exports = model('Perfil', PerfilShema);