const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  elimnarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middleware/validate-fields");
const { check } = require("express-validator");
const { isDate } = require("../helper/isDate");

const router = Router();

router.use(validarJWT); // de esta forma valida todos los api
router.get("/", getEventos);
router.post(
  "/",
  [
    //midleware
    check("title", "El title es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "FEcha de finalizacion obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put("/:id", actualizarEvento);
router.delete("/:id", elimnarEvento);

module.exports = router;
