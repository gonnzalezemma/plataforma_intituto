const { model, Schema } = require("mongoose");
const PublicacionShema = new Schema({

  idMateria: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  content: {
    type: String,
  },
  comentarios: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
      },
      content: {
        type: String,
        required: true,
      },
    },{
        timestamps: true,
        versionKey: false
    },
  ],
   
  active: {
    type: Boolean,
    default: true,
  },
  
},{
    timestamps: true,
    versionKey: false
});

module.exports = model("Publicacion", PublicacionShema);
