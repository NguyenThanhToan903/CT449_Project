const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Book",
    });
    console.log("Connect Success!", process.env.MONGODB_URI);
  } catch (error) {
    console.log("Connect Error!", error);
  }
};
