const { getPersonalizedNews } = require("./news.controller");
const { authenticateToken } = require("../../middlewares/auth.middleware");
const { Router } = require("express");

const router = Router();

router.get("/", authenticateToken, getPersonalizedNews);

module.exports = router;
