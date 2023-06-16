const express = require("express");
require("dotenv").config();
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const s3Clicent = require("@aws-sdk/client-s3");
const PutObjectCommand = require("@aws-sdk/client-s3").PutObjectCommand;

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const s3 = new s3Clicent.S3({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
});

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;

    const fileName = uuidv4();
    const buffer = await sharp(file.buffer)
      .resize({ height: 200, width: 200, fit: "cover" })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    res.status(201);
  } catch (err) {
    console.error("Failed to upload image", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
