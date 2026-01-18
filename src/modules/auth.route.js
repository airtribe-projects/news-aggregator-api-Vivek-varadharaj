const Router = require("express").Router();
const { register } = require("./auth.controller");

Router.post("/register", register);

module.exports = Router;
