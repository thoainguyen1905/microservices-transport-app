import express, { Router, Request, Response } from "express";
const transportRouter: Router = express.Router();
import { DeliveryModal, ReceiveModal } from "../models/transport.model";
import HistoryModel from "../models/history_phone.model";
import transportClient from "../transport_client";
import auth from "../middleware/auth";
import "dotenv/config";
// tạo đơn nhận hàng
transportRouter.post("/receive", auth, async (req: any, res: Response) => {
  transportClient.createReceive(
    {
      ...req.body,
      staffInfor: req.user,
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//tạo đơn chuyển hàng
transportRouter.post("/delivery", auth, async (req: any, res: Response) => {
  transportClient.createDelivery(
    {
      ...req.body,
      staffInfor: req.user,
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//lấy danh sách đơn hàng nhận
transportRouter.get("/receive", auth, async (req: any, res: Response) => {
  const { postCode, q, status } = req.query;
  transportClient.getReceive(
    {
      ...req.user,
      status: status.toString(),
      q: q ?? "",
      postCode: postCode ?? "",
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
// lấy danh sách đơn hàng chuyển đi
transportRouter.get("/delivery", auth, async (req: any, res: Response) => {
  const { postCode, q, status } = req.query;
  transportClient.getDelivery(
    {
      id: req.user.id,
      status: status.toString(),
      q: q ?? "",
      postCode: postCode ?? "",
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//thay đổi trạng thái khi user nhận hàng
transportRouter.post("/change/transport", async (req: any, res: Response) => {
  transportClient.changeStatus(
    {
      ...req.body,
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//thay đổi thông tin của một đơn gửi hàng
transportRouter.put("/delivery", async (req: Request, res: Response) => {
  try {
    const updateRecord = await DeliveryModal.findByIdAndUpdate(
      req.body._id,
      {
        postCode: req.body.postCode,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "success",
      status: 200,
      data: updateRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Không tìm thấy delivery id này",
      status: 500,
    });
  }
});
//thay đổi thông tin của một đơn nhận hàng
transportRouter.put("/receive", async (req: Request, res: Response) => {
  try {
    const updateRecord = await ReceiveModal.findByIdAndUpdate(
      req.body._id,
      {
        postCode: req.body.postCode,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "success",
      status: 200,
      data: updateRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Không tìm thấy delivery id này",
      status: 500,
    });
  }
});
// lấy thông tin chi tiết của một đơn gửi hàng
transportRouter.get("/delivery/id=:id", async (req: Request, res: Response) => {
  try {
    const details = await DeliveryModal.findById(req.params.id);
    if (details) {
      return res.status(200).json({
        message: "success",
        status: 200,
        data: details,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Không tìm thấy delivery id này",
      status: 500,
    });
  }
});
// lấy thông tin chi tiết của một đơn nhận hàng
transportRouter.get("/receive/id=:id", async (req: Request, res: Response) => {
  try {
    const details = await ReceiveModal.findById(req.params.id);
    if (details) {
      return res.status(200).json({
        message: "success",
        status: 200,
        data: details,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Không tìm thấy receive id này",
      status: 500,
    });
  }
});
//tạo một cuộc gọi đến với khách hàng
transportRouter.post("/delivery/call", async (req: Request, res: Response) => {
  try {
    const newData = new HistoryModel(req.body);
    await newData.save();
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Không tìm thấy receive id này",
      status: 500,
    });
  }
});
//lấy danh sách cuộc gọi của một đơn hàng
transportRouter.get("/call", async (req: Request, res: Response) => {
  try {
    const listCall = await HistoryModel.find({
      idTarget: req.query.id,
      target: req.query.target,
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      data: listCall,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Không tìm thấy id này",
      status: 500,
    });
  }
});

export default transportRouter;
