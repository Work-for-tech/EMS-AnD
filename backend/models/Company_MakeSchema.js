const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyMakeSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Companies", companyMakeSchema);
