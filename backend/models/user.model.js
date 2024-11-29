const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

const UserSchema = mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
