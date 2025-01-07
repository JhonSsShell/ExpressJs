const express = require('express');

const app = express.Router()

app.get('/username', (req, res) => {
  res.send("Ruta del usuario");
});

app.get('/profile', (req, res) => {
  res.send("Pagina del perfil");
})

module.exports = app;