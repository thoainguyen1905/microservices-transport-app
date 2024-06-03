const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/protos/transport.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  enums: String,
  longs: String,
  defaults: true,
  oneofs: true,
});

const transportProto = grpc.loadPackageDefinition(packageDefinition).Transport;

const transportClient = new transportProto.Transport(
  "localhost:3002",
  // 'transport-services.vercel.app',
  // "0.0.0.0:3002",
  grpc.credentials.createInsecure()
);

export default transportClient;
