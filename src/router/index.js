const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const authRoute = require("../modules/auth.route");

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "news-api",
    timestamp: new Date().toISOString(),
  });
});

router.post("/test-db-connection", async (req, res, next) => {
  const user = await userModel.create({
    name: "Test User",
    passwordHash: "hashedpassword123",
  });
  res.status().json({
    status: "success",
    data: user,
  });
});

router.use("/auth", authRoute);

module.exports = router;
