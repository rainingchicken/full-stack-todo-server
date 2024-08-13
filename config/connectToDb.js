const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to databse");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectToDb;
