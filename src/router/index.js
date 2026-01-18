const express = require("express");
const router = express.Router();

const authRoute = require("../modules/auth/auth.route");
const userRoute = require("../modules/user/user.route");
const preferencesRoute = require("../modules/preferences/preferences.route");
const newsRoutes = require("../modules/news/news.route");

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/preferences", preferencesRoute);
router.use("/news", newsRoutes);

module.exports = router;
