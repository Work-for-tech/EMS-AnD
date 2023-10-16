const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bulkIndentSchema = new Schema(
  {
    items: [
      {
        subcomponent: {
          type: Schema.Types.ObjectId,
          ref: "offersubcomponent",
        },
        quantity: {
          type: "Number",
        },
      },
    ],
    purchased: {
      type: "Boolean",
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bulkindent", bulkIndentSchema);
