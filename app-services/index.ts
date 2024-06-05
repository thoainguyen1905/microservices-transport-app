import routes from "./routes";
import cors from "cors";
import "dotenv/config";
import * as bodyParser from "body-parser";
const mongoose = require("mongoose");
import express, { Router } from "express";

const PORT = process.env.PORT || 8080;

const app = express();

const connectDB = async () => {
  // const dbURI =
  //   "mongodb+srv://thoaikun1905:thoaikun1905@cluster0.ohsmtrq.mongodb.net/";
  const dbURI =
    "mongodb+srv://thoaikun1905:thoaikun1905@cluster0.d8eadbt.mongodb.net/";
  mongoose.connect(dbURI, {});
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};
app.use(express.json());

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
