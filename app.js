
const express = require('express');
const userR = require('./routes/userRoutes');
const db = require("./config/DBConnection");

const app = express();
db.connect();

// Middleware para parsear JSON
app.use(express.json());

// Rutas definidas en userR
app.use(userR);

const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
