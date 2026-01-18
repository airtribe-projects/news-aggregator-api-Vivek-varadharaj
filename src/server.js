const envConfig = require("./config/env.js");
const app = require("./app.js");
const connectDB = require("./config/db.js");

const startServer = async () => {
  try {
    await connectDB(envConfig.mongodbUri);
    console.log("Database connected successfully");
    app.listen(envConfig.port, (err) => {
      console.log(`Server is listening on port ${envConfig.port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};
startServer();
