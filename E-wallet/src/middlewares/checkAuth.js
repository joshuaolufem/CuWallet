const User = require("../models/userModel");

exports.isAdmin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    const admin = user.role === "admin";
    if (!admin) {
      return res.status(401).json({
        message: "You do not have permission to perform this action",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    const provider = res.locals.loggedInProvider;
    const student = res.locals.loggedInStudent;
    if (!user & !provider & !student) {
      return res.status(501).json({ message: "You need to log in first" });
    } else {
      req.user = user || provider || student;
      next();
    }
  } catch (err) {
    next(err);
  }
};
