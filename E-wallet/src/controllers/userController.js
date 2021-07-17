const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const Provider = require("../models/serviceProviderModel");
const Student = require("../models/studentModel");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

require("dotenv").config(); // to use the env variables in dotenv

const secret = process.env.JWT_SECRET;
const reset = process.env.JWT_RESET;
const expiry = process.env.JWT_EXPIRY;

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

//Create Agent User
exports.createAgent = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    if ((!firstName, !lastName, !email, !password)) {
      return res.status(500).json({ message: "All inputs are required" });
    }
    User.findOne({ email }).then((user) => {
      if (user) {
        res.status(500).json({ message: "Agent user already exist" });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        const token = jwt.sign({ userId: newUser._id }, secret, {
          expiresIn: expiry,
        });
        newUser.token = token;
        newUser.verified = true;
        newUser.save();
        res.status(200).json({ message: "New agnt user created", newUser });
      }
    });
  } catch (err) {
    next(err);
  }
};
// Agent fund student's wallet
exports.fundStudentWallet = async (req, res, next) => {
  try {
    const agentId = req.params.agentId;
    const agent = await User.findById(agentId);
    if (!agent) {
      return res
        .status(500)
        .json({ message: "Agent not found or try to login again" });
    } else {
      let { amount, narration, to, from } = req.body;
      const student = await Student.findOne({ email: to });
      if (!student) {
        return res
          .status(501)
          .json({ message: "Receiving student email not found" });
      }
      const newTransaction = new Transaction({
        from: agent.email + " " + " (Agent email)",
        amount,
        narration: "Fund student wallet",
        to: student.email,
      });
      Transaction.create(newTransaction, (err, successfulTransaction) => {
        if (err) {
          return res.status(501).json({ err });
        } else {
          const output = `
        <h2 font-weight: bold;">Cuewallet - Transaction Alert</h2>
        <p>Reciept - </p>
        <p>Fund credited to your account</p>
        <p>Amount : ${newTransaction.amount}</p>
        <p>Narration: ${newTransaction.narration}</p><br>
        <p>By: ${newTransaction.from} </p><br><br>
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
            to: [student.email, agent.email], // list of receivers
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
              student.wallet = student.wallet + amount;
              student.transactions.push(successfulTransaction);
              agent.transactions.push(successfulTransaction);
              student.save();
              agent.save();
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
// Agent withdraw funds from student's wallet
exports.withdrawStudentCash = async (req, res, next) => {
  try {
    const agentId = req.params.agentId;
    const agent = await User.findById(agentId);
    if (!agent) {
      return res
        .status(500)
        .json({ message: "Agent not found or try to login again" });
    } else {
      let { amount, narration, to, from } = req.body;
      const student = await Student.findOne({ email: to });
      if (!student) {
        return res
          .status(501)
          .json({ message: "Receiving student email not found" });
      }
      const deduction = student.wallet * 0.1;
      const totalDeduction = amount + deduction;
      if (totalDeduction > student.wallet) {
        return res
          .status(501)
          .json({ message: "Insufficient student wallet balance" });
      }
      const newTransaction = new Transaction({
        from: agent.email + " " + " (Agent email)",
        amount,
        narration: "Withdraw from student wallet",
        to: student.email,
      });
      Transaction.create(newTransaction, (err, successfulTransaction) => {
        if (err) {
          return res.status(501).json({ err });
        } else {
          const output = `
        <h2 font-weight: bold;">Cuewallet - Transaction Alert</h2>
        <p>Reciept - </p>
        <p>Cash withdraw from your account</p>
        <p>Amount : ${newTransaction.amount}</p>
        <p>Charges(10%) : ${deduction} </p>
        <p>Wallet balance: ${student.wallet - totalDeduction} </p>
        <p>Narration: ${newTransaction.narration}</p><br>
        <p>By: ${newTransaction.from} </p><br><br>
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
            to: [student.email, agent.email], // list of receivers
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
              student.wallet = student.wallet - totalDeduction;
              student.transactions.push(successfulTransaction);
              agent.transactions.push(successfulTransaction);
              student.save();
              agent.save();
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
// Agent fund service provider's wallet
exports.fundProviderWallet = async (req, res, next) => {
  try {
    const agentId = req.params.agentId;
    const agent = await User.findById(agentId);
    if (!agent) {
      return res
        .status(500)
        .json({ message: "Agent not found or try to login again" });
    } else {
      let { amount, narration, to, from } = req.body;
      const provider = await Provider.findOne({ email: to });
      if (!provider) {
        return res
          .status(501)
          .json({ message: "Receiving provider email not found" });
      }
      const newTransaction = new Transaction({
        from: agent.email + " " + " (Agent email)",
        amount,
        narration: "Fund provider wallet",
        to: provider.email,
      });
      Transaction.create(newTransaction, (err, successfulTransaction) => {
        if (err) {
          return res.status(501).json({ err });
        } else {
          const output = `
        <h2 font-weight: bold;">Cuewallet - Transaction Alert</h2>
        <p>Reciept - </p>
        <p>Fund credited to your account</p>
        <p>Amount : ${newTransaction.amount}</p>
        <p>Narration: ${newTransaction.narration}</p><br>
        <p>By: ${newTransaction.from} </p><br><br>
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
            to: provider.email, // list of receivers
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
              provider.wallet = provider.wallet + amount;
              provider.transactions.push(successfulTransaction);
              agent.transactions.push(successfulTransaction);
              provider.save();
              agent.save();
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
// Agent withdraw funds from student's wallet
exports.withdrawProviderCash = async (req, res, next) => {
  try {
    const agentId = req.params.agentId;
    const agent = await User.findById(agentId);
    if (!agent) {
      return res
        .status(500)
        .json({ message: "Agent not found or try to login again" });
    } else {
      let { amount, narration, to, from } = req.body;
      const provider = await Provider.findOne({ email: to });
      if (!provider) {
        return res
          .status(501)
          .json({ message: "Receiving provider email not found" });
      }
      const deduction = provider.wallet * 0.1;
      const totalDeduction = amount + deduction;
      if (totalDeduction > provider.wallet) {
        return res
          .status(501)
          .json({ message: "Insufficient provider wallet balance" });
      }
      const newTransaction = new Transaction({
        from: agent.email + " " + " (Agent email)",
        amount,
        narration: "Withdraw from provider wallet",
        to: provider.email,
      });
      Transaction.create(newTransaction, (err, successfulTransaction) => {
        if (err) {
          return res.status(501).json({ err });
        } else {
          const output = `
        <h2 font-weight: bold;">Cuewallet - Transaction Alert</h2>
        <p>Reciept - </p>
        <p>Cash withdraw from your account</p>
        <p>Amount : ${newTransaction.amount}</p>
        <p>Charges(10%) : ${deduction} </p>
        <p>Wallet balance: ${provider.wallet - totalDeduction} </p>
        <p>Narration: ${newTransaction.narration}</p><br>
        <p>By: ${newTransaction.from} </p><br><br>
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
            to: provider.email, // list of receivers
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
              provider.wallet = provider.wallet - totalDeduction;
              provider.transactions.push(successfulTransaction);
              agent.transactions.push(successfulTransaction);
              provider.save();
              agent.save();
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
//Login users
exports.loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    const provider = await Provider.findOne({ email });
    const user = await User.findOne({ email });
    if (!student & !provider & !user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (student) {
        const validPassword = await validatePassword(
          password,
          student.password
        );
        if (!validPassword)
          return res.status(404).json({ message: "Password is not correct" });
        const token = jwt.sign({ userId: student._id }, secret, {
          expiresIn: expiry,
        });
        await Student.findByIdAndUpdate(student._id, { token });
        // student.token = token;
        res
          .status(200)
          .json({ message: "Student loggin successfully", student });
      } else if (provider) {
        if (provider.verified === false) {
          return res.status(401).json({
            message: "Service provider not verified yet. Can't login now",
          });
        }
        const validPassword = await validatePassword(
          password,
          provider.password
        );
        if (!validPassword)
          return res.status(404).json({ message: "Password is not correct" });
        const token = jwt.sign({ userId: provider._id }, secret, {
          expiresIn: expiry,
        });
        await Provider.findByIdAndUpdate(provider._id, { token });
        // provider.token = token;
        res
          .status(200)
          .json({ message: "provider loggin successfully", provider });
      } else if (user) {
        if (user.verified === false) {
          return res.status(401).json({
            message: "User not verified yet. Can't login now",
          });
        }
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword)
          return res.status(404).json({ message: "Password is not correct" });
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: expiry,
        });
        await User.findByIdAndUpdate(user._id, { token });
        // user.token = token;
        res.status(200).json({ message: "user loggin successfully", user });
      }
    }
  } catch (err) {
    next(err);
  }
};
//Forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(500).json({ message: "Email field is empty" });
    } else {
      const user =
        (await Student.findOne({ email })) ||
        (await Provider.findOne({ email }));
      if (!user) {
        return res
          .status(500)
          .json({ message: "Email address does not exist in our database" });
      } else {
        const token = jwt.sign({ userId: user._id }, reset, {
          expiresIn: "30m",
        });
        const CLIENT_URL = req.protocol + "://" + req.headers.host;
        const output = `
            <h2 font-weight: bold;">Forgot Password </h2>
            <p>Follow this link to reset your password</p><br>
            <p>${CLIENT_URL}/user/auth/forgotpassword/${token}</p><br>
            <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
            <p>If you didn't ask to reset your password, you can ignore this email</p><br><br>
            <p>Thanks </p>
            <p>E-wallet</p>
        `;
        if (user.matric) {
          await Student.updateOne({ resetlink: token }, (err, success) => {
            if (err) {
              return res.status(500).json({ message: err });
            } else {
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
                to: user.email, // list of receivers
                subject: "Forgot password", // Subject line
                html: output, // html body
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(500).json({
                    message:
                      "Something went wrong on our end. Please try again.",
                  });
                } else {
                  console.log("Mail sent : %s", info.response);
                  res.status(200).json({
                    message: "Reset passwor link sent to User's mail box",
                  });
                }
              });
            }
          });
        } else {
          await Provider.updateOne({ resetlink: token }, (err, success) => {
            if (err) {
              return res.status(500).json({ message: err });
            } else {
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
                to: user.email, // list of receivers
                subject: "Forgot password", // Subject line
                html: output, // html body
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(500).json({
                    message:
                      "Something went wrong on our end. Please try again.",
                  });
                } else {
                  console.log("Mail sent : %s", info.response);
                  res.status(200).json({
                    message: "Reset passwor link sent to User's mail box",
                  });
                }
              });
            }
          });
        }
      }
    }
  } catch (err) {
    next(rr);
  }
};
//------------ Redirect to Reset Handle ------------//
exports.gotoReset = (req, res) => {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, reset, (err, decodedToken) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        const { userId } = decodedToken;
        const user = Student.findById(userId) || Provider.findById(userId);
        if (!user) {
          return res.status(500).json({
            message: "User with email ID does not exist! Please try again.",
          });
        } else {
          return res
            .status(200)
            .json({ message: "Goto the reset page to reset your password" });
        }
      }
    });
  } else {
    return res.status(500).json({ message: "Password reset error!" });
  }
};
//Change password
exports.resetPassword = async (req, res, next) => {
  try {
    let { password, confirmPassword } = req.body;
    const userId = req.params.id;
    const user =
      (await Student.findById(userId)) || (await Provider.findById(userId));
    if (!user) {
      return res.status(500).json({
        message: "User with email ID does not exist! Please try again.",
      });
    }
    //------------ Checking required fields ------------//
    if (!password || !confirmPassword) {
      res.status(500).json({ message: "All field is required" });
    }
    //------------ Checking password mismatch ------------//
    else if (password != confirmPassword) {
      res.status(500).json({ message: "Password do not match" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          password = hash;
          if (user.matric) {
            Student.findByIdAndUpdate(
              { _id: userId },
              { password },
              function (err, result) {
                if (err) {
                  return res.status(500).json({ message: err });
                } else {
                  return res.status(200).json({
                    message: "Password reset succesful. Try to login now",
                  });
                }
              }
            );
          } else {
            Provider.findByIdAndUpdate(
              { _id: userId },
              { password },
              function (err, result) {
                if (err) {
                  return res.status(500).json({ message: err });
                } else {
                  return res.status(200).json({
                    message: "Password reset succesful. Try to login now",
                  });
                }
              }
            );
          }
        });
      });
    }
  } catch (err) {
    next(err);
  }
};
