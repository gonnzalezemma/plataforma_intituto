const {model, Schema}= require('mongoose');
const PublicacionShema = new Schema({

    author:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'   
    },
    content:{
        type: String,
       
    },
    comentarios:[{
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'Usuario'    
        },
        content:{   
        type: String,
        required: true
        },
        timeStamp:{
            createdAt: Date,
            default: Date.now()
        }
    }],
    timeStamp:{
        createdAt: Date,
        default: Date.now()
    },    
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Publicacion', PublicacionShema);