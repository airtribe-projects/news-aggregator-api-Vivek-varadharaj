const Router = require("express").Router();
const { register, login } = require("./auth.controller");

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
