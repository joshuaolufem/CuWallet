const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  narration: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
