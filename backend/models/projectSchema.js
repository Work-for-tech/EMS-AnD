const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },

  project_name: {
    type: String,
  },

  is_finalized: {
    type: Boolean,
    default: false,
  },

  total_price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("project", projectSchema);
