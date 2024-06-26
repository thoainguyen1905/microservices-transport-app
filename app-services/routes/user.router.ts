import authClient from "../user_client";
import express, { Router } from "express";
import { Request, Response } from "express";
const userRouter: Router = express.Router();
//đăng ký
userRouter.post("/sign-in", async (req: Request, res: Response) => {
  authClient.signIn(
    { phone: req.body.phone, password: req.body.password },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});

userRouter.post("/test", async (req: Request, res: Response) => {
  authClient.test({ message: req.body!.message }, (err, response) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(response);
  });
});
//đăng nhập
userRouter.post("/sign-up", async (req: Request, res: Response) => {
  authClient.signUp(
    {
      phone: req.body.phone,
      password: req.body.password,
      code: req.body.code,
      name: req.body.name,
      post: req.body.post,
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//tạo các địa điểm bưu cục
userRouter.post("/shipping", async (req: Request, res: Response) => {
  authClient.createShipping(
    {
      name: req.body.name,
      address: req.body.address,
      code: req.body.code,
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//gọi lấy thông tin user
userRouter.get("/me", async (req: any, res: Response) => {
  const authHeader = req.headers["authorization"];
  authClient.getMe(
    {
      token: authHeader,
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});
//lấy danh sách bưu cục cho user
userRouter.get("/shipping", async (req: Request, res: Response) => {
  authClient.getShippings(
    {
      status: "1",
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});

export default userRouter;
