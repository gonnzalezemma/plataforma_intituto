const {model, Schema}= require('mongoose');
const UserShema = new Schema({

    dni:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        required:true
    },
    active:{
        type:Boolean,
        required:true,
        default:true,
    },
    
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Usuario', UserShema);