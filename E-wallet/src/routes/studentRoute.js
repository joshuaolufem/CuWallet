const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const checkAuth = require("../middlewares/checkAuth");

// Student signup
router.post("/auth/signup", studentController.registerStudent);
// Verify Student account
router.get("/auth/verify/:token", studentController.verifyStudent);
// Student Profile
router.get("/:studentId", checkAuth.isLoggedIn, studentController.profile);
// Transfer route
router.post(
  "/:studentId/transfer",
  checkAuth.isLoggedIn,
  studentController.sendMoney
);
//Wallet Transaction history
router.get(
  "/:studentId/wallet/history",
  checkAuth.isLoggedIn,
  studentController.getTransferHistory
);

module.exports = router;
