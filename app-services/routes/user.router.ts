import authClient from "../user_client";
import express, { Router } from "express";
import { Request, Response } from "express";
const userRouter: Router = express.Router();

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
  console.log(req.body.message);
  authClient.test({ message: req.body!.message }, (err, response) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(response);
  });
});

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

export default userRouter;
