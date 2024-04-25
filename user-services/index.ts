import express from "express";
import * as bodyParser from "body-parser";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/protos/user.proto";
import { signIn, getMe, signUp } from "./controllers/user.controller";
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

const userProto = grpc.loadPackageDefinition(packageDefinition).Authentication;
function main() {
  const server = new grpc.Server();
  server.addService(userProto.Auth.service, {
    signIn: signIn,
    getMe: getMe,
    signUp: signUp,
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
