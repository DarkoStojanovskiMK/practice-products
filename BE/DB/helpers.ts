import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

import dotenv from "dotenv";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const uri = process.env.MONGO_DB_URI || "";

const connectDB: any = async () => {
  return mongoose.connect(uri, {
    // eslint-disable-next-line
    dbName: "proshop",
  });
};

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:"),
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected on DB", "Proshop");
});

export default connectDB;
