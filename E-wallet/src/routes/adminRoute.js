const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");

// Create new Agent
router.post(
  "/agent/new",
  checkAuth.isLoggedIn,
  checkAuth.isAdmin,
  userController.createAgent
);
//All Students
router.get(
  "/students",
  checkAuth.isLoggedIn,
  checkAuth.isAdmin,
  adminController.getStudents
);
//A Student
router.get(
  "/student/:studentId",
  checkAuth.isLoggedIn,
  checkAuth.isAdmin,
  adminController.getStudent
);
// All Unverified Service Provider
router.get(
  "/provider/unverifiedserviceproviders",
  checkAuth.isLoggedIn,
  checkAuth.isAdmin,
  adminController.getUnverifiedProviders
);
//A Service Provider
router.get(
  "/provider/:providerId",
  checkAuth.isLoggedIn,
  checkAuth.isAdmin,
  adminController.getProvider
);
// Verify service provider
router.put(
  "/provider/verify/:providerId",
  checkAuth.isLoggedIn,
  checkAuth.isAdmin,
  adminController.verifyServiceProvider
);

module.exports = router;
