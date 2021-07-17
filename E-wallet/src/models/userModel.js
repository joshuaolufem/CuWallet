const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "agent",
      enum: ["agent", "admin"],
    },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetlink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
module.exports = User;
