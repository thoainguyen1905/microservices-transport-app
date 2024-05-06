import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import grpc from "@grpc/grpc-js";
import UserModel from "../models/user.model";
import ShippingModel from "../models/shipping.model";

export const signIn = async ({ request }, callback: any) => {
  try {
    // const data = req.body;
    const staff = await UserModel.findOne({
      phone: request.phone,
    });
    if (staff === null) {
      return callback(null, {
        message: "Không tìm thấy user",
        status: 404,
      });
    }
    bcrypt.compare(request.password, staff.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            name: staff.name,
            phone: staff.phone,
            code: staff.code,
            avatar: staff.avatar,
            post: staff.post,
            createTime: staff.createTime,
            id: staff.id,
          },
          process.env.SECRET_KEY
        );
        // return res.status(200).json({
        //   token,
        //   message: "success",
        //   status: 200,
        // });
        callback(null, { token, message: "success", status: 200 });
      } else {
        callback({
          status: 404,
          message: "INCORREST EMAIL OR PASSWORD",
        });
        // return res.status(401).json({
        //   message: "mật khẩu không đúng",
        //   status: 401,
        // });
      }
    });
  } catch (error) {
    // return res.status(500).json(error);
    callback(error);
  }
};

export const signUp = async ({ request }, callback: any) => {
  try {
    const user = await UserModel.findOne({ phone: request.phone });
    if (user) {
      callback(null, {
        message: "Tài khoản đã tồn tại",
      });
    } else {
      bcrypt.hash(request.password, 10, async (err, hash) => {
        if (err) {
          console.error("Error occurred while hashing password:", err);
          return;
        }
        const newUser = new UserModel({
          phone: request.phone,
          password: hash,
          name: request.name,
          code: request.code,
          post: request.post,
          avatar:
            "https://vcdn-kinhdoanh.vnecdn.net/2023/08/31/image2-2439-1693476735.jpg",
        });
        await newUser.save();
        callback(null, {
          message: "success",
          status: 200,
        });
      });
    }
  } catch (error) {
    callback(error);
  }
};

export const createShipping = async ({ request }, callback: any) => {
  try {
    const newShipping = new ShippingModel({
      name: request.name,
      address: request.address,
      code: request.code,
    });
    await newShipping.save();
    callback(null, {
      message: "success",
      status: 200,
    });
  } catch (error) {
    callback(error);
  }
};

export const getShippings = async ({ request }, callback: any) => {
  try {
    const shippings = await ShippingModel.find();
    callback(null, {
      message: "success",
      status: 200,
      data: [...shippings],
    });
  } catch (error) {
    callback(error);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const testapi = async ({ req }, callback: any) => {
  try {
    callback(null, req.body);
  } catch (error) {
    callback(error);
  }
};
