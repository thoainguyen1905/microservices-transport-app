import express, { Router } from "express";
const routes: Router = express.Router();
import userRouter from "./user.router";
import transportRouter from "./transport.router";
import refundRouter from "./refund.router";

const api = routes.use(userRouter).use(transportRouter).use(refundRouter);

export default routes.use("/api", api);
