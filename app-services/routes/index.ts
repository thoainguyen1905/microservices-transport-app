import express, { Router } from "express";
const routes: Router = express.Router();
import userRouter from "./user.router";

const api = routes.use(userRouter);

export default routes.use("/v1", api);
