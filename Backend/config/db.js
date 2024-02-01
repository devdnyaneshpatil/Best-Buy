const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.MONGO_URL);

const connectDB = async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
