const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drawing = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "client",
    require: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "project",
    require: true,
  },
  drawingPath: {
    type: "String",
    require: true,
  },
  current: {
    type: "Boolean",
    default: true,
  },
  time: {
    type: "Date",
    default: new Date(),
  },
});

module.exports = mongoose.model("drawing", drawing);
