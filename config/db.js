const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log(`Connect to ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
