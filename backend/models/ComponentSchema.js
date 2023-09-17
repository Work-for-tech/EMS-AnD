const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// incomer,star delta

const componentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  sub_components: [
    {
      subcomponent_id: {
        type: Schema.Types.ObjectId,
        ref: "subcomponent",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("component", componentSchema);
