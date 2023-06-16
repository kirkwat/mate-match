const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.query.email) {
      res.status(400).json({ message: "Missing email query parameter" });
    }

    const file = req.file;

    const fileName = uuidv4();
    const buffer = await sharp(file.buffer).resize(300, 300).toBuffer();

    const avatar = await req.models.avatar.addAvatarImage(
      req.query.email,
      fileName,
      buffer,
      file.mimetype
    );

    res.status(201).json(avatar);
  } catch (err) {
    console.error("Failed to upload image", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
