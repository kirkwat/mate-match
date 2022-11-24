const express = require("express");
const router = express.Router();

//get all or ?name=... or ?email=...
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const result = await req.models.roommate.addRoommate(
      body.person1,
      body.person2
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to add roommate to house:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
