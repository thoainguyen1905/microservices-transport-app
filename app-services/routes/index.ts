import express, { Router } from "express";
const routes: Router = express.Router();
import userRouter from "./user.router";
import transportRouter from "./transport.router";

const api = routes.use(userRouter).use(transportRouter);

export default routes.use("/api", api);
