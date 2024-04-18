const Mensajes = require("../models/mensajes");

const obtenerChat = async (req, resp) => {
  const miId = req.uid;
  const mensajesDe = req.params.de;

  const las30 = await Mensajes.find({
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, para: miId },
    ],
  })
    .sort({ createAt: "asc" })
    .limit(30);

  resp.json({
    ok: true,
    mensajes: las30,
  });
};

module.exports = {
  obtenerChat,
};
