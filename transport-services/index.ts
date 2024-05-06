import express from "express";
import * as bodyParser from "body-parser";
const grpc = require("@grpc/grpc-js");
const mongoose = require("mongoose");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/protos/transport.proto";
import {
  changeStatus,
  createDelivery,
  createReceive,
  getDelivery,
  getReceive,
} from "./controllers/transport.controller";

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
const transportProto = grpc.loadPackageDefinition(packageDefinition).Transport;
async function main() {
  await connectDB();
  const server = new grpc.Server();
  server.addService(transportProto.Transport.service, {
    createReceive: createReceive,
    createDelivery: createDelivery,
    changeStatus: changeStatus,
    getDelivery: getDelivery,
    getReceive: getReceive,
  });
  server.bindAsync(
    "0.0.0.0:3002",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("[TRANSPORT SERVICE] running on 3002");
      server.start();
    }
  );
}

main();
