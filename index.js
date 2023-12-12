const express = require("express");
const cors = require("cors");
const { DBConection } = require("./database/config");
require("dotenv").config();
//crear servidor
const app = express();

// date base
DBConection();

// CORS
app.use(cors());

//DIrectorio publico
app.use(express.static("public"));

//parseo de request
app.use(express.json());
//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});
