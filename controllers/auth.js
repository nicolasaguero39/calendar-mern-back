const Usuario = require("../Models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helper/jwt");

const crearUsuario = async (req, res) => {
  console.log(req.body);

  const { name, email, pass } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ ok: false, msg: "email ya registrado" });
    }

    usuario = new Usuario(req.body);

    //Encriptar pass

    const salt = bcrypt.genSaltSync();
    usuario.pass = bcrypt.hashSync(pass, salt);

    await usuario.save();
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({ ok: true, msg: "registro creado", token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "No se pudo registrar el usuario" });
  }
};
const logingUsuario = async (req, res) => {
  console.log(req.body);
  const { name, email, pass } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ ok: false, msg: "usuario no existe" });
    }
    console.log("Usuario", usuario);

    //Confirmar pass
    const validarPass = bcrypt.compareSync(pass, usuario.pass);

    if (!validarPass) {
      return res.status(400).json({ ok: false, msg: "pass incorrecto" });
    }

    // generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res
      .status(200)
      .json({ ok: true, uid: usuario.id, name: usuario.name, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "No se pudo logear" });
  }
};
const revalidarToken = async (req, res) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);
  res.json({ ok: true, msg: "revalidacionToken", token, uid, name });
};

module.exports = {
  crearUsuario: crearUsuario,
  logingUsuario: logingUsuario,
  revalidarToken: revalidarToken,
};
