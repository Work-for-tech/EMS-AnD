const mongoose = require("mongoose");
const schema = mongoose.Schema;

const grnAppPendingSchema = new schema({
  grn_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "grn",
      required: true,
    },
  ],
  purchase_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "purchase",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "receivedItem",
      required: true,
    },
  ],
});

module.exports = mongoose.model("grnAppPending", grnAppPendingSchema);
