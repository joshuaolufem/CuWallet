const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController");
const checkAuth = require("../middlewares/checkAuth");

// Service provider signup
router.post("/auth/signup", providerController.registerProvider);
// Creating new product
router.post(
  "/:providerId/newproduct",
  checkAuth.isLoggedIn,
  providerController.newProduct
);
//Service provider dashboard
router.get(
  "/:providerId",
  checkAuth.isLoggedIn,
  providerController.getDashboard
);
//Service provider get unconfirmed orders
router.get(
  "/:providerId/orders/unconfirm",
  checkAuth.isLoggedIn,
  providerController.getUnconfirmOrders
);
//verify unconfirm orders
router.put(
  "/:providerId/orders/confirm/:orderId",
  checkAuth.isLoggedIn,
  providerController.verifyOrder
);
module.exports = router;
