const express = require('express');
const app = express.Router();

app.all('/about', (req, res) => {
  res.send("About page");
});

app.get('/dashboard', (req, res) => {
  res.send("Dashboard page");
});

module.exports = app;