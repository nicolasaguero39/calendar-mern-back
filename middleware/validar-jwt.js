const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  // x-token headers

  const token = req.header("x-token");

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, msg: "no hay token en la peticion" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "error al verificar token" });
  }

  next();
};

module.exports = { validarJWT };
