const mongoose = require("mongoose");

const database = async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("data base connted");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  } catch (error) {
    console.log("MongoDb Connection Err ", error);
  }
};

module.exports = database;
