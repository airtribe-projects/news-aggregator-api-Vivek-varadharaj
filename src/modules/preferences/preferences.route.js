const { getPreferences, upsertPreferences } = require("./preferences.controller");
const { authenticateToken } = require("../../middlewares/auth.middleware");
const { Router } = require("express");

const router = Router();

router.get("/", authenticateToken, getPreferences);
router.post("/", authenticateToken, upsertPreferences);

module.exports = router;