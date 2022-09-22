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
    role:{
        type: String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    
});

module.exports = model('Usuario', UserShema);