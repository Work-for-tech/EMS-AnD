const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// incomer,star delta

const componentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  sub_components: [
    {
      type: Schema.Types.ObjectId,
      ref: "offersubcomponent",
      required: true,
    },
  ],
});

module.exports = mongoose.model("offercomponent", componentSchema);
