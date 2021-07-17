const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const Provider = require("../models/serviceProviderModel");
const Student = require("../models/studentModel");
const User = require("../models/userModel");

require("dotenv").config(); // to use the env variables in dotenv

const secret = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRY;

// Getting all Students
exports.getStudents = async (req, res, next) => {
  Student.find({})
    .then((students) => {
      res.status(200).json({ message: "All Students", students });
    })
    .catch((err) => next(err));
};
// Getting a student
exports.getStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      return res.status(200).json({ message: "Student found", student });
    }
  } catch (err) {
    next(err);
  }
};
// Getting all Service Provider
exports.getProviders = async (req, res, next) => {
  Provider.find({})
    .then((providers) => {
      res.status(200).json({ message: "All Service providers", providers });
    })
    .catch((err) => next(err));
};
//Getting Unverified Service provider
exports.getUnverifiedProviders = async (req, res, next) => {
  try {
    const provider = await Provider.find({ verified: false });
    if (provider) {
      {
        res
          .status(200)
          .json({ message: "All unverified service provider", provider });
      }
    }
  } catch (err) {
    next(err);
  }
};
// Verify unverified  service provider
exports.verifyServiceProvider = async (req, res, next) => {
  try {
    const providerId = req.params.providerId;
    const provider = await Provider.findByIdAndUpdate(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Service provider not found" });
    } else {
      provider.verified = true;
      const email = provider.email;
      const companyName = provider.companyName;
      const businessOwner = provider.businessOwner;
      const output = `
              <h2 font-weight: bold;">Account verified</h2>
              <p>Your request to be a service provider as ${companyName} with owner's name '${businessOwner}' on Cuewalleta has been verified.</p>
              <p>You can now login in with your details on our site</p><br>
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
        subject: "Account verification update", // Subject line
        html: output, // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Something went wrong on our end. Please register again.",
          });
        } else {
          console.log("Mail sent : %s", info.response);
          provider.save();
          res.status(404).json({
            message: "Service provider verifification successful",
            provider,
          });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
// Getting a service provider
exports.getProvider = async (req, res, next) => {
  try {
    console.log(req.params);
    const providerId = req.params.providerId;
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Service provider not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Service provider found", provider });
    }
  } catch (err) {
    next(err);
  }
};
//Getting all Agent Users and Admin
exports.getAgents = async (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ message: "All users", users });
    })
    .catch((err) => next(err));
};
