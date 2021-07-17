const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderModel = new mongoose.Schema({
  student: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    name: String,
    email: String,
  },
  serviceprovider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number },
  number: { type: String },
  confirm: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderModel);
module.exports = Order;
