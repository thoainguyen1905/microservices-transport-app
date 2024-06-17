import express, { Router, Request, Response } from "express";
const refundRouter: Router = express.Router();
import auth from "../middleware/auth";
import "dotenv/config";
import { createRefund, getRefund } from "../controllers/refund.controller";

refundRouter.get("/refund", auth, getRefund);
refundRouter.post("/refund", auth, createRefund);

export default refundRouter;

//thiết lập api cho hoàn hàng
