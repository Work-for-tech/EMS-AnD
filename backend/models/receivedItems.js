const mongoose = require("mongoose");
const schema = mongoose.Schema;

const receivedItemSchema = new schema({
  sub_component_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offersubcomponent",
    required: true,
  },
  quantity_received: {
    type: Number,
    default: 1,
  },
  quantity_expected: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("receivedItem", receivedItemSchema);
