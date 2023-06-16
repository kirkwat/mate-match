const express = require("express");
const router = express.Router();

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

router.get("/", async (req, res, next) => {
  if (req.query.email) {
    const roommates = await req.models.roommate.getRoommates(req.query.email);
    const roommatesWithAvatars = await req.models.avatar.getAvatarImages(
      roommates
    );

    res.json(roommatesWithAvatars);
    next();
  }
});

module.exports = router;
