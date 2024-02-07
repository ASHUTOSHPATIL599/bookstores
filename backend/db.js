const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/bookstoreproject";
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("db connected");
  } catch (error) {
    console.error("connection faild", error);
  }
};
module.exports = connectDB;
