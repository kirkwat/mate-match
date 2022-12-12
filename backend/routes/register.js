const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    console.log(req.models);
    const result = await req.models.user.createUser(body.email, body.password);
    const pref = await req.models.user.addPref(
      body.email,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to create new user:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(201).json({
        message:
          "Username already in use. Please use another username or login to your existing account.",
      });
    } else {
      res.status(500).json({ message: err.toString() });
    }
  }
  next();
});
module.exports = router;
