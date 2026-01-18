const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  apiKey: process.env.API_KEY,
  newsApiBaseUrl: process.env.NEWS_API_BASE_URL,
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
};
