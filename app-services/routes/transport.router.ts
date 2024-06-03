import express, { Router, Request, Response } from "express";
const transportRouter: Router = express.Router();
import transportClient from "../transport_client";
import auth from "../middleware/auth";
import "dotenv/config";

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

transportRouter.get("/receive", auth, async (req: any, res: Response) => {
  const status = req.query.status;
  const query = req.query.q;
  transportClient.getReceive(
    {
      ...req.user,
      status: status.toString(),
      q: query ?? "",
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});

transportRouter.get("/delivery", auth, async (req: any, res: Response) => {
  const status = req.query.status;
  const query = req.query.q;
  transportClient.getDelivery(
    {
      id: req.user.id,
      status: status.toString(),
      q: query ?? "",
    },
    (err, response) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(response);
    }
  );
});

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

export default transportRouter;
