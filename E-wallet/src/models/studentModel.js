const mongoose = require("mongoose");

const studentModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    matric: {
      type: String,
      required: true,
      uppercase: true,
    },
    level: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    department: {
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
      required: true,
    },
    wallet: {
      type: Number,
      default: 500.0,
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

const Student = mongoose.model("Student", studentModel);
module.exports = Student;
