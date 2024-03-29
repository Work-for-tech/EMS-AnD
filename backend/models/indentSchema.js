const mongoose = require("mongoose");
const scehma = mongoose.Schema;

const indentSchema = new scehma(
  {
    clientId: {
      type: scehma.Types.ObjectId,
      ref: "client",
    },
    projectId: {
      type: scehma.Types.ObjectId,
      ref: "project",
    },
    items: [
      {
        subcomponent: {
          type: scehma.Types.ObjectId,
          ref: "offersubcomponent",
        },
        discount: {
          type: "Number",
          default: 0,
        },
        quantityRequired: {
          type: "Number",
        },
        quantityOrdered: {
          type: "Number",
        },
        purchased: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("indent", indentSchema);
