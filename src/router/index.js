const express = require("express");
const router = express.Router();

const authRoute = require("../modules/auth/auth.route");
const preferencesRoute = require("../modules/preferences/preferences.route");
const newsRoutes = require("../modules/news/news.route");

// Auth routes under /users
router.use("/users", authRoute);
// Preferences routes under /users
router.use("/users", preferencesRoute);
// News routes
router.use("/news", newsRoutes);

module.exports = router;
