const Product = require("../models/productModel");
const Student = require("../models/studentModel");
const Transaction = require("../models/transactionModel");
const Provider = require("../models/serviceProviderModel");
const Order = require("../models/orderModel");

function generateRandom(len, arr) {
  var ans = "";
  for (var i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}
const random = generateRandom(7, "0123456789abcdefghij");

//All product
exports.getProducts = async (req, res, next) => [
  Product.find()
    .then((products) => {
      res.status(200).json({ message: "All product", products });
    })
    .catch((err) => next(err)),
];
//Get a product
exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(500).json({ message: "Product not found" });
  } else {
    res.status(200).json({ message: "Product details page", product });
  }
};
//Order for a product
exports.orderProduct = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (!quantity) {
      return res
        .status(500)
        .json({ message: "You must input the quantity you want" });
    }
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({ message: "Product not found" });
    } else {
      const studentId = req.params.studentId;
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(500).json({ message: "Student not found" });
      } else {
        const newOrder = new Order({
          student: {
            id: student._id,
            name: student.firstName + " " + student.lastName,
            email: student.email,
          },
          serviceprovider: product.serviceprovider.id,
          product: product,
          quantity: quantity,
          number: random,
        });
        const totalPrice = newOrder.quantity * product.price;
        if (quantity > product.quantity) {
          return res
            .status(500)
            .json({ message: "Not enough stock to match your quantity order" });
        }
        if (student.wallet < totalPrice) {
          return res.status(500).json({
            message: "Student does not have enough balance to purchase this",
          });
        }
        const providerId = newOrder.product.serviceprovider._id;
        const provider = await Provider.findOne(providerId);
        if (!provider) {
          return res.status(500).json({
            message: "Service provider of this product does not exist",
          });
        } else {
          Order.create(newOrder, (err, successOrder) => {
            if (err) {
              res.status(500).json({ err });
            } else {
              const newTransaction = new Transaction({
                from: student.email,
                amount: product.price,
                narration: "Ordered for a product",
                to: provider.email,
              });
              Transaction.create(newTransaction, (err, successTransaction) => {
                if (err) {
                  return res.status(501).json({ err });
                } else {
                  student.wallet = student.wallet - totalPrice;
                  provider.wallet = provider.wallet + totalPrice;
                  product.quantity = product.quantity - newOrder.quantity;
                  student.transactions.push(successTransaction);
                  provider.transactions.push(successTransaction);
                  provider.orders.push(newOrder);
                  provider.save();
                  student.save();
                  product.save();
                  res.status(200).json({
                    message:
                      "Order succesfully placed. Wait for the service provider to verify your order",
                    newOrder,
                  });
                }
              });
            }
          });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};
