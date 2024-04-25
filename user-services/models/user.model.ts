const mongoose = require("mongoose");
import jwt from "jsonwebtoken";
import "dotenv/config";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  code: { type: String, required: false },
  post: { type: Array, required: true },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  return token;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
