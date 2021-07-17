const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const seedAdmin = () => {
  User.findOne({ role: "admin" }, (err, admin) => {
    if (err) console.log(err);
    if (admin) {
      return console.log("Admin already exists");
    }
    User.create(
      {
        firstName: "Admin",
        lastName: "Ewalleta",
        email: "ewalleta@admin.com",
        verified: true,
        role: "admin",
        password: "password",
      },
      (err, user) => {
        if (err) throw err;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            const token = jwt.sign(
              {
                userId: user._id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            user.token = token;
            user.save((err, savedUser) => {
              if (err) console.log(err);
              return console.log("Admin account created");
            });
          });
        });
      }
    );
  });
};

//seedAdmin();
