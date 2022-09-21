const {model, Schema}= require('mongoose');
const UserShema = new Schema({

    dni:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    activo:{
        type: Boolean,
        default: true
    },
    perfilUser:{
        
        type: Schema.Types.ObjectId,
        ref: 'Publicaciones'
    
    },
    role:{
        type: String,
        required:true
    },
    
});

module.exports = model('Usuario', UserShema);