import { Request, Response } from "express";
import { deliveryStaffValidation } from "./transport.types";
import { generateCodeTransport } from "../helpers/react-utils";
import { ReceiveModal, DeliveryModal } from "../models/transport.model";

export const createReceive = async ({ request }, callback: any) => {
  try {
    let code = generateCodeTransport();
    const newDelivery = new ReceiveModal({
      ...request,
      code,
      staffInfor: request.staffInfor.id,
    });
    await newDelivery.save();
    // }
    callback(null, {
      message: "success",
      status: 200,
    });
  } catch (error) {
    callback(error);
  }
};

export const createDelivery = async ({ request }, callback: any) => {
  try {
    let code = generateCodeTransport();
    const newDelivery = new DeliveryModal({
      ...request,
      code,
      staffInfor: request.staffInfor.id,
    });
    await newDelivery.save();
    callback(null, {
      message: "success",
      status: 200,
    });
  } catch (error) {
    callback(error);
  }
};

export const changeStatus = async ({ request }, callback: any) => {
  try {
    const { id, status, target } = request;
    if (target === "receive") {
      const transport = await ReceiveModal.findByIdAndUpdate(id, {
        status: status,
      });
    } else if (target === "delivery") {
      const transport = await DeliveryModal.findByIdAndUpdate(id, {
        status: status,
      });
    }
    callback(null, {
      message: "success",
      status: 200,
    });
  } catch (error) {
    callback(error);
  }
};

export const getReceive = async ({ request }, callback: any) => {
  try {
    const listReceiver = await ReceiveModal.find({
      staffInfor: request.id,
    }).select("-staffInfor");
    callback(null, {
      message: "success",
      status: 200,
      data: listReceiver,
    });
  } catch (error) {
    callback(error);
  }
};

export const getDelivery = async ({ request }, callback: any) => {
  try {
    const listReceiver = await DeliveryModal.find({
      staffInfor: request.id,
    }).select("-staffInfor");

    callback(null, {
      message: "success",
      status: 200,
      data: listReceiver,
    });
  } catch (error) {
    callback(error);
  }
};
