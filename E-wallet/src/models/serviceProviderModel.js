const mongoose = require("mongoose");

const serviceProvider = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    businessOwner: {
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
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
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

const ServiceProvider = mongoose.model("ServiceProvider", serviceProvider);
module.exports = ServiceProvider;
