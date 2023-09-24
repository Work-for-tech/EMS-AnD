const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vendorSchema = new schema({
  vendorName: {
    type: "String",
  },
  phoneNumber1: {
    type: "Number",
  },
  phoneNumber2: {
    type: "Number",
  },
  email1: {
    type: "String",
  },
  email2: {
    type: "String",
  },
  gst: {
    type: "String",
    length: 12,
  },
  address: {
    type: "String",
  },
  panNo: {
    type: "String",
    length: 10,
  },
  accountNo: {
    type: "Number",
  },
  ifsc: {
    type: "String",
  },
  remarks: {
    type: "String",
    length: 5000,
  },
});

module.exports = mongoose.model("vendor", vendorSchema);
