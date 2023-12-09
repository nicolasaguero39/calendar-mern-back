const Evento = require("../Models/Evento");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helper/jwt");

const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate("user", "name");
  res.status(201).json({ ok: true, eventos });
};
const crearEvento = async (req, res) => {
  const { title, start, end, notes } = req.body;
  try {
    let evento = new Evento(req.body);
    evento.user = req.uid;
    await evento.save();

    res.status(201).json({ ok: true, msg: "Evento creado", evento });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "No se pudo registrar el Evento" });
  }
};
const actualizarEvento = async (req, res) => {
  const eventID = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventID);
    if (!evento) {
      return res.status(401).json({ ok: false, msg: "evento no existe" });
    }

    if (evento.user.toString() !== uid) {
      return res
        .status(401)
        .json({ ok: false, msg: "solo el auto puede editar" });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventID,
      nuevoEvento
    );

    res.json({ ok: true, evento: eventoActualizado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "No se pudo editar el evento" });
  }
};
const elimnarEvento = async (req, res) => {
  const eventID = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventID);
    if (!evento) {
      return res.status(401).json({ ok: false, msg: "evento no existe" });
    }

    if (evento.user.toString() !== uid) {
      return res
        .status(401)
        .json({ ok: false, msg: "solo el autor puede eliminar" });
    }
    

    await Evento.findByIdAndDelete(eventID);

    res.json({ ok: true, msg: "Evento eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "No se pudo editar el evento" });
  }
};

module.exports = { getEventos, crearEvento, actualizarEvento, elimnarEvento };
