import { Request, Response } from "express";
import RefundModel from "../models/refund.model";

export const createRefund = async (req: any, res: Response) => {
  try {
    const newRefund = new RefundModel({
      staffInfor: req.user.id,
      deliveryInfor: req.body.deliveryInfor,
      receiveInfor: req.body.receiveInfor,
      target: req.body.target,
      reason: req.body.reason,
    });
    newRefund.save();
    return res.status(200).json({
      status: 200,
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Lỗi server rồi!",
    });
  }
};

export const getRefund = async (req: any, res: Response) => {
  const { target, id } = req.query;
  try {
    if (target === "delivery") {
      const listRefund = await RefundModel.find({
        target: "delivery",
        staffInfor: req.user.id,
      }).populate("deliveryInfor");
      return res.status(200).json({
        status: 200,
        message: "success",
        data: listRefund,
      });
    } else if (target === "receive") {
      const listRefund = await RefundModel.find({
        target: "receive",
        staffInfor: req.user.id,
      }).populate("receiveInfor");
      return res.status(200).json({
        status: 200,
        message: "success",
        data: listRefund,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Không tìm thấy target hoặc id",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Lỗi server rồi!",
    });
  }
};
