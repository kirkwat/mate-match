const knex = require("../config/knex");
require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const {
  CloudFrontClient,
  CreateInvalidationCommand,
} = require("@aws-sdk/client-cloudfront");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const USERS_TABLE = "users";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const cloudfrontDistributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const cloudfrontUrl = process.env.CLOUDFRONT_URL;
const cloudfrontKeyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;

const secretRegion = process.env.SECRET_REGION;
const secretSigningKey = process.env.SECRET_SIGNING_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
});

const cloudfront = new CloudFrontClient({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
});

const secretsManager = new SecretsManagerClient({
  region: secretRegion,
});

const addAvatarImage = async (email, photoID, fileName, buffer, mimetype) => {
  if (photoID) {
    await removeAvatarImage(photoID);
  }

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  await knex(USERS_TABLE).update({ photoID: fileName }).where({ email });

  const users = await knex(USERS_TABLE).select().where({ email });

  const result = await getAvatarImages(users);

  return result;
};

const getAvatarImages = async (users) => {
  const command = new GetSecretValueCommand({
    SecretId: secretSigningKey,
  });

  const secret = await secretsManager.send(command);

  for (const user of users) {
    if (user.photoID === null) continue;

    user.signedUrl = getSignedUrl({
      url: cloudfrontUrl + user.photoID,
      keyPairId: cloudfrontKeyPairId,
      dateLessThan: new Date(Date.now() + 60 * 60 * 1000),
      privateKey: secret.SecretString,
    });
  }
  return users;
};

const removeAvatarImage = async (photoID) => {
  const params = {
    Bucket: bucketName,
    Key: photoID,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  const invalidationParams = {
    DistributionId: cloudfrontDistributionId,
    InvalidationBatch: {
      CallerReference: photoID,
      Paths: {
        Quantity: 1,
        Items: [`/${photoID}`],
      },
    },
  };

  const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
  await cloudfront.send(invalidationCommand);

  const query = knex(USERS_TABLE).update({ photoID: null }).where({ photoID });
  return await query;
};

module.exports = {
  addAvatarImage,
  getAvatarImages,
};
