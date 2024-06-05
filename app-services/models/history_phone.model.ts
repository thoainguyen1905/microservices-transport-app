import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HistoryPhoneSchema = new Schema({
  target: { type: String, required: true },
  idTarget: { type: String, required: true },
  timeCall: { type: Number, required: true },
  missing: { type: Boolean, required: true, default: false },
  phone: { type: String, required: true },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const HistoryModel = mongoose.model("History_Phone", HistoryPhoneSchema);

export default HistoryModel;
