const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

module.exports = { databaseConnect };