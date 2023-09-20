const mongoose = require("mongoose");

module.exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB not connected");
    });
};
