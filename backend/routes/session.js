const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const refreshTokenController = require("../controllers/refreshTokenController");
const logoutController = require("../controllers/logoutController");

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const result = await authController.handleLogin(
      body.email,
      body.password
    );
    if (result.refreshToken){
      res.cookie('jwt', result.refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 2000});
    }
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
    if (!req.cookies?.jwt) return res.sendStatus(401);

    const result = await refreshTokenController.handleRefreshToken(req.cookies);

    if(!result) return res.sendStatus(403);

    res.status(201).json(result);
  }
  catch (err) {
    console.error("Failed to refresh session:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.get("/logout", async (req, res, next) => {
  try {
    if (!req.cookies?.jwt) return res.sendStatus(204);

    const result = await logoutController.handleLogout(req.cookies);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json(result);
  }
  catch (err) {
    console.error("Failed to logout:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
