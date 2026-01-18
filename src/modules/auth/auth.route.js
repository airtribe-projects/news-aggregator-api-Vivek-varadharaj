const Router = require("express").Router();
const { signup, login } = require("./auth.controller");

Router.post("/signup", signup);
Router.post("/login", login);

module.exports = Router;
