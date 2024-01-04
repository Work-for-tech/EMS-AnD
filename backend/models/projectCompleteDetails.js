const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complete = new Schema(
  {
    panelTesting: {
      type: Boolean,
    },
    qanda: {
      type: Boolean,
    },
    truckDetails: {
      companyName: {
        type: String,
      },
      OwnerName: {
        type: String,
      },
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projectComplete", complete);
