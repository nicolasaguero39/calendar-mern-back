// Rutas de usuario
// host+/api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validate-fields");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router();

const {
  crearUsuario,
  logingUsuario,
  revalidarToken,
} = require("../controllers/auth");

router.get("/renew", validarJWT, revalidarToken);

router.post("/", logingUsuario);
router.post(
  "/new",
  [
    //midleware
    check("name", "El name es obligatorio").not().isEmpty(),
    check("pass", "El pass debe ser 4 minimo").isLength({ min: 4 }),
    validarCampos,
  ],
  crearUsuario
);

module.exports = router;
