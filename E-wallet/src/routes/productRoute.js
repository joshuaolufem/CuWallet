const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const checkAuth = require('../middlewares/checkAuth');

// All products
router.get("/", productController.getProducts);
// All products
router.get("/:productId", productController.getProduct);
// Order for a product
router.post(
    "/:productId/student/:studentId/order",
    checkAuth.isLoggedIn,
    productController.orderProduct
  );
module.exports = router;
