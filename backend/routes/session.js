const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const result = await UserController.authenticatePers(
      body.email,
      body.password
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to authenticate user:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
