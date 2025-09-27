import mongoose from "mongoose";
import logger from "../Services/logs.service.ts";

// Attempt to connect to the database
const connectToDB = async () => {
  await mongoose
    .connect(process.env.MONGODB!) // con el ! le decimos que no esta vació
    .then((res) => {
      logger.info("Database connected");
    })
    .catch(async (error) => {
      logger.warn("Retrying to connect to the database...");
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds before retrying
      await connectToDB();
    });
};

export default connectToDB;
