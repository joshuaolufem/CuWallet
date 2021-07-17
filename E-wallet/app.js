const express = require("express");
const jwt = require("jsonwebtoken");
const cors =  require("cors");

const app = express();
const port = process.env.PORT || 3000;


const mongoDb = require("./src/db/mongoSetup");
//const seedAdmin = require("./src/seeds/adminSeed");
const studentRoute = require("./src/routes/studentRoute");
const serviceProviderRoute = require("./src/routes/serviceProviderRoute");
const userRoute = require("./src/routes/userRoute");
const adminRoute = require("./src/routes/adminRoute");
const productRoute = require("./src/routes/productRoute");
const User = require("./src/models/userModel");
const Student = require("./src/models/studentModel");
const Provider = require("./src/models/serviceProviderModel");
const Product = require("./src/models/productModel");
// dotenv config
require("dotenv").config(); // to use the env variables in dotenv

// Express parser config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());
// Header token set up
app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Header",
    "X-Requested-With, content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.headers["x-access-token"]) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
      if (err) {
        res.status(500).json({ message: "Token has expired. Login again" });
        return false;
      } else {
        //Checking if token has  expired
        if (Date.now() >= decodeToken.exp * 1000) {
          return res
            .status(401)
            .json({ error: "Token has expired. Login again" });
        }
        const userId = decodeToken.userId;
        res.locals.loggedInUser = await User.findById(userId);
        res.locals.loggedInStudent = await Student.findById(userId);
        res.locals.loggedInProvider = await Provider.findById(userId);
      }
      next();
    });
  } else {
    next();
  }
});
// Routes Set up
app.use("/student", studentRoute);
app.use("/provider", serviceProviderRoute);
app.use("/user", userRoute);
app.use("/admin/dashboard", adminRoute);
app.use("/products", productRoute);

//MongoDb set up
mongoDb();
app.listen(port, () => {
  console.log(`App server running on ${port}...`);
});
