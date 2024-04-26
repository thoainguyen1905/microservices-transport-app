import routes from "./routes";
import cors from "cors";
import "dotenv/config";
import * as bodyParser from "body-parser";
import express, { Router } from "express";

const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
