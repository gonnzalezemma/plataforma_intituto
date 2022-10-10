const { model, Schema } = require("mongoose");

const PerfilShema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },

  carrera: {
    type: String,
  },
  materias: 
  [
    {
    materia:{
      type: Schema.Types.ObjectId,
      ref: "Materia",
    },}
  ],
});
module.exports = model("Perfil", PerfilShema);
