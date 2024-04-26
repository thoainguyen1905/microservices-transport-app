const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/protos/user.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  enums: String,
  longs: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).Authentication;

const authClient = new userProto.Auth(
  "localhost:3001",
  // "0.0.0.0:3001",
  grpc.credentials.createInsecure()
);

export default authClient;
