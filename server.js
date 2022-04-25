const app = require('./app.js');
const express = require("express");
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server should be running at http://localhost:${PORT}/`))