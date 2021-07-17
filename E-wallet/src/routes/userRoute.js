const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const providerController = require("../controllers/providerController");
const userController = require("../controllers/userController");
const checkAuth = require("../middlewares/checkAuth");

//All users login route
router.post("/auth/login", userController.loginHandler);
//All users forgot password route
router.post("/auth/forgotpassword", userController.forgotPassword);
//All users reset password page route
router.get("/auth/forgotpassword/:token", userController.gotoReset);
//All users reset password
router.post("/auth/reset/:id", userController.resetPassword);
//Agent fund student wallet
router.post(
  "/agent/:agentId/fundstudentwallet",
  checkAuth.isLoggedIn,
  userController.fundStudentWallet
);
//Agent withdraw from student wallet
router.post(
  "/agent/:agentId/withdrawstudentcash",
  checkAuth.isLoggedIn,
  userController.withdrawStudentCash
);
//Agent fund provider wallet
router.post(
  "/agent/:agentId/fundproviderwallet",
  checkAuth.isLoggedIn,
  userController.fundStudentWallet
);
//Agent withdraw from provider wallet
router.post(
  "/agent/:agentId/withdrawprovidercash",
  checkAuth.isLoggedIn,
  userController.withdrawStudentCash
);

module.exports = router;
