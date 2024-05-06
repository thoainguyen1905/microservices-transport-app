import express from "express";
import * as bodyParser from "body-parser";
const grpc = require("@grpc/grpc-js");
const mongoose = require("mongoose");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/protos/user.proto";
import {
  signIn,
  getMe,
  signUp,
  testapi,
  createShipping,
  getShippings,
} from "./controllers/user.controller";
import cors from "cors";
const app = express();

const PORT = 8080;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  enums: String,
  longs: String,
  defaults: true,
  oneofs: true,
});

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
const userProto = grpc.loadPackageDefinition(packageDefinition).Authentication;
async function main() {
  await connectDB();
  const server = new grpc.Server();
  server.addService(userProto.Auth.service, {
    test: testapi,
    signIn: signIn,
    signUp: signUp,
    createShipping: createShipping,
    getShippings: getShippings,
  });
  server.bindAsync(
    "0.0.0.0:3001",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("[AUTH SERVICE] running on 3001");
      server.start();
    }
  );
}

main();
