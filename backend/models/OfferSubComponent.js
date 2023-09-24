// DeOkumar
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subComponentSchema = new Schema({
  desc: {
    type: String,
    required: true,
    message: "Name is required.",
  },

  catalog_number: {
    type: String,
    required: false,
  },

  rating_value: {
    type: String,
    required: false,
  },

  title: {
    type: String,
    required: false,
  },

  company: {
    company_name: {
      type: Schema.Types.ObjectId,
      ref: "Companies",
    },
    price: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },

  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("offersubcomponent", subComponentSchema);
