const { getPreferences, updatePreferences } = require("./preferences.controller");
const { authenticateToken } = require("../../middlewares/auth.middleware");
const { Router } = require("express");

const router = Router();

router.get("/preferences", authenticateToken, getPreferences);
router.put("/preferences", authenticateToken, updatePreferences);

module.exports = router;