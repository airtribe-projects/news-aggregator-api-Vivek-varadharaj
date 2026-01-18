const { Router } = require("express");
const { getMe, updateMe } = require("./user.controller");
const { authenticateToken } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/me", authenticateToken, getMe);
router.patch("/me", authenticateToken, updateMe);

module.exports = router;
