const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const Student = require("../models/studentModel");
const Transaction = require("../models/transactionModel");
const Provider = require("../models/serviceProviderModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

require("dotenv").config(); // to use the env variables in dotenv

const secret = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRY;

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Create new student
exports.registerStudent = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      matric,
      level,
      course,
      email,
      department,
      password,
      confirmPassword,
    } = req.body;
    // Validating input data
    if (
      (!firstName ||
      !lastName ||
      !email ||
      !matric ||
      !level ||
      !course ||
      !department ||
      !password ||
      !confirmPassword)
    ) {
      res.status(500).json({ message: "All input are required" });
    }
    if (password != confirmPassword) {
      res.status(500).json({ message: "Password does not match" });
    }
    Student.findOne({ email })
      .then((student) => {
        if (student) {
          return res.status(500).json({
            message: "student already exist, please login",
          });
        } else {
          const newStudent = new Student({
            firstName,
            lastName,
            matric,
            level,
            course,
            department,
            email,
            password,
          });
          const token = jwt.sign(
            {
              userId: newStudent._id,
              firstName,
              lastName,
              matric,
              level,
              course,
              department,
              email,
              password,
            },
            secret,
            {
              expiresIn: "30m",
            }
          );
          const CLIENT_URL = req.protocol + "://" + req.headers.host;
          const output = `
        <h2 font-weight: bold;">Verify Your Account </h2>
        <p>Hello ${lastName} ${firstName}</p>
        <p>Your application on Cuewallet was received.</p><br>
        <a href="${CLIENT_URL}/student/auth/verify/${token}">Click here or copy this link to verify your account</a>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        <p>If you didn't ask to verify this address, you can ignore this email</p><br>
        <p>Thanks </p>
        <p>E-Wallet Convenant University</p>
        `;
          // ------------- Gmail Transporter Will Be Implemented Later ---------------
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
              clientId: process.env.OAUTH_CLIENTID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            },
          });

          // send mail with defined transport object
          const mailOptions = {
            from: "E-wallet@admin.com", // sender address
            to: email, // list of receivers
            subject: "Verify your acccount", // Subject line
            html: output, // html body
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({
                message:
                  "Something went wrong on our end. Please register again.",
              });
            } else {
              console.log("Mail sent : %s", info.response);
              res.status(200).json({
                message: "Check your mail inbox for verification mail",
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
// Verify new student
exports.verifyStudent = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(500).json({ err });
        } else {
          const {
            firstName,
            lastName,
            email,
            password,
            matric,
            level,
            department,
            course,
          } = decodedToken;
          Student.findOne({ email }).then((student) => {
            if (student) {
              //------------ Student already exists ------------//
              res.status(201).json({
                message: "Student already registered! Please log in.",
              });
            } else {
              const newStudent = new Student({
                firstName,
                lastName,
                email,
                password,
                matric,
                level,
                course,
                department,
              });
              const newToken = jwt.sign({ userId: newStudent._id }, secret, {
                expiresIn: expiry,
              });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newStudent.password, salt, (err, hash) => {
                  if (err) throw err;
                  newStudent.password = hash;
                  newStudent.verified = true;
                  newStudent.token = newToken;
                  newStudent
                    .save()
                    .then((student) => {
                      res.status(200).json({
                        message: "Account activated. You can now log in.",
                      });
                    })
                    .catch((err) => console.log(err));
                });
              });
            }
          });
        }
      });
    } else {
      res.status(501).json({ message: "Account activation error!" });
    }
  } catch (err) {
    console.log(err);
  }
};
// Student Profile
exports.profile = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student does not exist in database" });
    } else {
      return res.status(200).json({ message: "Student profile", student });
    }
  } catch (err) {
    next(err);
  }
};
//Student transact to eachother
exports.sendMoney = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(501).json({
        message:
          "You can't perform this operation, try to login again. Student not found",
      });
    } else {
      let { amount, narration, to, from } = req.body;
      if (amount > student.wallet) {
        return res.status(501).json({
          message: "You do not have enough balance to perform this action",
        });
      }
      const receiver = await Student.findOne({ email: to });
      if (!receiver) {
        return res
          .status(501)
          .json({ message: "Receiving student email not found" });
      }
      const newTransaction = new Transaction({
        from: student.email,
        amount,
        narration,
        to: receiver.email,
      });
      Transaction.create(newTransaction, (err, successfulTransaction) => {
        if (err) {
          return res.status(501).json({ err });
        } else {
          const output = `
        <h2 font-weight: bold;">Cuewallet - Transaction Alert</h2>
        <p>Reciept - </p>
        <p>Credited : ${receiver.email}</p>
        <p>Debited : ${student.email}</p>
        <p>Amount : ${newTransaction.amount}</p>
        <p>Narration: ${newTransaction.narration}</p><br>
        <p>E-Wallet Convenant University</p>
        `;
          // ------------- Gmail Transporter Will Be Implemented Later ---------------
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
              clientId: process.env.OAUTH_CLIENTID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            },
          });

          // send mail with defined transport object
          const mailOptions = {
            from: "E-wallet@admin.com", // sender address
            to: [receiver.email, student.email], // list of receivers
            subject: "Cuewallet - Transaction Alert", // Subject line
            html: output, // html body
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({
                message:
                  "Something went wrong on our end. Please register again.",
              });
            } else {
              console.log("Mail sent : %s", info.response);
              student.wallet = student.wallet - amount;
              receiver.wallet = receiver.wallet + amount;
              student.transactions.push(successfulTransaction);
              receiver.transactions.push(successfulTransaction);
              student.save();
              receiver.save();
              res
                .status(200)
                .json({ message: "Your transaction is successfull" });
            }
          });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
//Transaction History
exports.getTransferHistory = async (req, res, next) => {
  try {
    Student.findById({ _id: req.params.studentId })
      .populate("transactions")
      .exec((err, foundStudent) => {
        if (err) {
          return res.status(500).json({ message: err });
        } else {
          res.status(200).json({ message: "Wallet History", foundStudent });
        }
      });
  } catch (err) {
    next(err);
  }
};
