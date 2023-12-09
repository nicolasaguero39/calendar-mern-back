const { Schema, model } = require("mongoose");

const UsuarioSquema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Usuario", UsuarioSquema);
