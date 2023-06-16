const knex = require("../config/knex");
require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const USERS_TABLE = "users";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
});

const addAvatarImage = async (email, fileName, buffer, mimetype) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  const query = knex(USERS_TABLE)
    .update({ photoID: fileName })
    .where({ email });

  const result = await query;
  return result;
};

const getAvatarImages = async (users) => {
  for (const user of users) {
    const params = {
      Bucket: bucketName,
      Key: user.photoID,
    };

    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    user.signedUrl = signedUrl;
  }
  return users;
};

module.exports = {
  addAvatarImage,
  getAvatarImages,
};
