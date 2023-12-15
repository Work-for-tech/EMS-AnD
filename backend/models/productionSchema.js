const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prod = new Schema(
  {
    mainSection: {
      type: "String",
    },
    subSection: {
      type: "String",
    },
    approvedBy: {
      type: "String",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    finishedOn: {
      type: "Date",
      default: Date.now(),
    },
    report: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("production", prod);
