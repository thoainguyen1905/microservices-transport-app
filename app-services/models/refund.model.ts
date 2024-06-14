import { ref, required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RefundSchema = new Schema({
  deliveryInfor: {
    type: Schema.Types.ObjectId,
    ref: "Delivery",
  },
  receiveInfor: {
    type: Schema.Types.ObjectId,
    ref: "Receive",
  },
  reason: { type: String, required: true },
  target: { type: String, required: true },
  staffInfor: { type: Schema.Types.ObjectId, ref: "Staff" },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const RefundModel = mongoose.model("refund", RefundSchema);

export default RefundModel;
