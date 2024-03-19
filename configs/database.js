const mongoose = require("mongoose");
const configuration = require("./configuration");
const userModel = require("../models/user.model");

const connectDB = async () => {
  try {
    await mongoose.connect(configuration.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const admin = await userModel.findOne({
      username: "admin",
    });

    if (!admin) {
      await userModel.create(configuration.ADMIN);
    }

    console.log("Kết nối db thành công");
  } catch (error) {
    console.log("error db: " + error.message);
  }
};

module.exports = connectDB;
