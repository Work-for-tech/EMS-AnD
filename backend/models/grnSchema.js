const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grnSchema = new Schema({
  invoice_number: {
    type: String,
    required: true,
  },
  received_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  vender_id: {
    type: Schema.Types.ObjectId,
    ref: "vendor",
    required: true,
  },
  truck_pic_url: {
    type: String,
    required: true,
  },
  bill_pic_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("grn", grnSchema);
