const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const refreshTokenController = require("../controllers/refreshTokenController");


router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const result = await authController.handleLogin(
      body.email,
      body.password
    );

    res.cookie('jwt', result.refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 2000});
    res.status(201).json(result.accessToken);
  }
  catch (err) {
    console.error("Failed to authenticate user:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.get("/refresh", async (req, res, next) => {
  try {
    const result = await refreshTokenController.handleRefreshToken(req.cookies);

    res.cookie('jwt', result.refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 2000});
    res.status(201).json(result.accessToken);
  }
  catch (err) {
    console.error("Failed to authenticate user:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
