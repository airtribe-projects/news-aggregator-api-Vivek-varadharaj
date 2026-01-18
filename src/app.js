const express = require("express");
const app = express();
const router = require("./router/index.js");
const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

module.exports = app;
