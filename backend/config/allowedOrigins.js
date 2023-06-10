require("dotenv").config();

const allowedOrigins = [process.env.CLIENT_URL];

module.exports = allowedOrigins;
