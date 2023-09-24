const mongoose = require("mongoose");
const scehma = mongoose.Schema;

const storeSchema = new mongoose.Schema({
  desc: {
    type: "String",
  },
  catalog_number: {
    type: "String",
  },
  rating_value: {
    type: "String",
  },
  companyId: {
    type: scehma.Types.ObjectId,
    ref: "Companies",
  },
  quantity: {
    type: "Number",
    default: 0,
  },
});

module.exports = mongoose.model("store", storeSchema);
