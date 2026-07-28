import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import logger from "./utils/logger";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();