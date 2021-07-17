const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const Provider = require("../models/serviceProviderModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Student = require("../models/studentModel");
const Transaction = require("../models/transactionModel");

require("dotenv").config(); // to use the env variables in dotenv

const secret = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRY;

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
// Create new service provider
exports.registerProvider = async (req, res, next) => {
  try {
    const {
      companyName,
      businessOwner,
      logo,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    // Validating input data
    if (
      (!companyName,
      !businessOwner,
      !logo,
      !email,
      !phoneNumber,
      !password,
      !confirmPassword)
    ) {
      res.status(500).json({ message: "All input are required" });
    }
    if (password != confirmPassword) {
      res.status(500).json({ message: "Password does not match" });
    }
    Provider.findOne({ email })
      .then((provider) => {
        if (provider) {
          return res.status(201).json({
            message: "Service Provider already exist, please login",
          });
        } else {
          const newProvider = new Provider({
            companyName,
            businessOwner,
            logo,
            email,
            phoneNumber,
            password: hashedPassword,
            confirmPassword,
          });
          const token = jwt.sign(
            {
              userId: newProvider._id,
            },
            secret,
            {
              expiresIn: "1d",
            }
          );
          newProvider.token = token;
          newProvider.save();
          const output = `
              <h2 font-weight: bold;">Verify Your Account </h2>
              <p>We have receive your request to be a service provider as ${companyName} on Cuewalleta</p>
              <p>Please wait, while we verify your details</p><br>
              <p><b>NOTE:</b> This won't take long.</p>
              <p>An email will be sent to you after our verification process is done</p><br>
              <p>Thanks</p>
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
              res.status(500).json({
                message:
                  "Registration is successful, Please check your email for approval",
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    throw err;
  }
};
//Upload new product
exports.newProduct = async (req, res, next) => {
  try {
    const { title, price, picture, quantity, category } = req.body;
    if (!title || !price || !picture || !quantity || !category) {
      return res.status(501).json({ message: "All field are required" });
    } else {
      const providerId = req.params.providerId;
      const provider = await Provider.findById(providerId);
      if (!provider) {
        return res
          .status(501)
          .json({ message: "Provider not found to perform this operation" });
      } else {
        const newProduct = new Product({
          title,
          price,
          picture,
          quantity,
          category,
          serviceprovider: {
            id: provider._id,
            businessOwner: provider.businessOwner,
            companyName: provider.companyName,
            email: provider.email,
            phoneNumber: provider.phoneNumber,
          },
        });
        await newProduct.save();
        res
          .status(200)
          .json({ message: "New product uploaded succesfully", newProduct });
      }
    }
  } catch (err) {
    next(err);
  }
};
//Transaction History
exports.getDashboard = async (req, res, next) => {
  try {
    Provider.findById({ _id: req.params.providerId })
      .populate("transactions")
      .populate("orders")
      .exec((err, foundProvider) => {
        if (err) {
          return res.status(500).json({ message: err });
        } else {
          res
            .status(200)
            .json({ message: "Service provider dashboard", foundProvider });
        }
      });
  } catch (err) {
    next(err);
  }
};
//Get student unconfirmed order
exports.getUnconfirmOrders = async (req, res, next) => {
  try {
    const providerId = req.params.provideId;
    const provider = await Provider.findOne(providerId);
    if (!provider) {
      return res.status(500).json({ message: "Service provider not found" });
    } else {
      Order.find({ confirm: false })
        .then((orders) => {
          res.status(200).json({ message: "All unconfirm orders", orders });
        })
        .catch((err) => next(err));
    }
  } catch (err) {
    next(err);
  }
};
//Verify student order
exports.verifyOrder = async (req, res, next) => {
  try {
    const providerId = req.params.provideId;
    const provider = await Provider.findOne(providerId);
    if (!provider) {
      return res.status(500).json({ message: "Service provider not found" });
    } else {
      const orderId = req.params.orderId;
      const order = await Order.findByIdAndUpdate(orderId);
      if (!order) {
        res.status(500).json({ message: "Order not found" });
        return false;
      }
      if (order.confirm != false) {
        res.status(500).json({ message: "Order already confirm" });
        return false;
      }
      // const checkProvider = Number(provider._id);
      // console.log(checkProvider);
      // if (provider._id != order.serviceprovider) {
      //   console.log(provider._id);
      //   console.log(order.serviceprovider);
      //   res.status(500).json({
      //     message:
      //       "This service provider caanot perfrom this action. Not the owner of the product",
      //   });
      //   return false;
      // }
      const getStudent = order.student;
      const studentId = getStudent.id;
      const student = await Student.findOne(studentId);
      if (!student) {
        res
          .status(500)
          .json({ message: "Student that ordered cannot be found" });
      } else {
        const output = `
              <h2 font-weight: bold;">Order confirm</h2>
              <p>Your order has been confirmed</p><br>
              <p>Your order number is ${order.number} </p>
              <p>Please keep this for future reference</p><br><br>
              <p>Thanks</p>
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
          to: student.email, // list of receivers
          subject: "Your Order Has Beeen Confirmed", // Subject line
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
            order.confirm = true;
            order.save();
            res.status(404).json({
              message: "Service provider has successfully confirm order",
              order,
            });
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
