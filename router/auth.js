/*  path: api/login  */

const { Router } = require("express");
const { crearUsuario, renewToken, login } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Crear nuevos usuarios
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

/* */

// Login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  login
);

// Revalidar Token
router.get("/renew",validarJWT, renewToken);

module.exports = router;
