const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, resp = response) => {
  try {
    const { email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return resp.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardad usuario en BD
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id);

    resp.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return resp.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    // Validar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return resp.status(404).json({
        msg: "Contraseña incorrecta",
      });
    }

    const token = await generarJWT(usuarioDB.id);

    resp.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, resp) => {
  const uid = req.uid;

  // Generar un nuevo JWT
  const token = await generarJWT(uid);

  //Obtener el usuario por UID
  const usuario = await Usuario.findById(uid);

  resp.json({
    ok: true,
    usuario,
    token,
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
