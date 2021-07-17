const mongoose = require("mongoose");

module.exports = () => {
  //   const { MongoClient } = require('mongodb');
  // const uri = "mongodb+srv://aveiro:<password>@cluster0.cmdjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });
  mongoose.connect(
    "mongodb+srv://aveiro:aveiro@cluster0.cmdjz.mongodb.net/cu-walleta?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("MongoDb connected...");
    }
  );
};
//Used for local
// mongodb://127.0.0.1:27017/ewallet
