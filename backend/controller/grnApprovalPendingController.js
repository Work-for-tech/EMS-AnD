const grnApprovalPendingSchema = require("../models/grnApprovalPendingSchema");
const purchaseSchema = require("../models/purchaseSchema");
const bulkPurchaseSchema = require("../models/bulkPurchaseSchema");
const received_item_data_schema = require("../models/receivedItems");

exports.createGrnApprovalPending = async (request, response) => {
  try {
    const { purchase_id, grn_id } = request.body;

    // Check if data with the specified purchase_id already exists in the database
    const existingData = await grnApprovalPendingSchema.findOne({
      purchase_id,
    });

    if (existingData) {
      // If data exists, append to the grn_id array
      existingData.grn_id.push(grn_id);
      const updatedData = await existingData.save();

      response.status(200).json({
        data: updatedData,
        message: "GRN Approval Pending updated successfully!!!",
      });
    } else {
      // If data does not exist, create a new document
      const newData = await grnApprovalPendingSchema.create({
        purchase_id,
        grn_id: [grn_id], // Initialize grn_id as an array with the first element
      });

      response.status(200).json({
        data: newData,
        message: "GRN Approval Pending created successfully!!!",
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

exports.getGrnApprovalPending = async (request, response) => {
  try {
    const { purchase_id } = request.body;

    console.log("purchase_id", purchase_id);

    var grn_data = await grnApprovalPendingSchema
      .find({
        purchase_id: purchase_id,
      })
      .populate("items")
      .exec();
    console.log("grn_data", grn_data);

    if (grn_data.length != 0 && grn_data != []) {
      return response.status(200).json({
        data: grn_data,
        message: "GRN Approval Pendings fetched successfully!!!",
      });
    } else {
      var purchase_data = await purchaseSchema.findOne({
        _id: purchase_id,
      });

      if (purchase_data != null) {
        const mapped_data = purchase_data.items.map((item) => {
          const received_item_data = {
            sub_component_id: item.subcomponent,
            quantity_received: 0,
            quantity_expected: item.quantity,
          };
          return received_item_data;
        });

        var saved_received_data = await received_item_data_schema.create(
          mapped_data
        );

        const _ids = saved_received_data.map((received_item_data) => {
          return received_item_data._id;
        });

        const saved_data = await grnApprovalPendingSchema.create({
          purchase_id: purchase_data._id,
          grn_id: [], // Initialize grn_id as an array with the first element
          items: _ids,
        });

        return response.status(200).json({
          data: purchase_data,
          message: "GRN Approval Pendings fetched successfully!!!",
        });
      } else {
        var bulk_purchase_data = await bulkPurchaseSchema.findOne({
          purchase_id,
        });

        const mapped_data = bulk_purchase_data.items.map((item) => {
          const received_item_data = {
            sub_component_id: item.subcomponent,
            quantity_received: 0,
            quantity_expected: item.quantity,
          };
          return received_item_data;
        });

        var saved_received_data = await received_item_data_schema.create(
          mapped_data
        );

        const _ids = saved_received_data.map((received_item_data) => {
          return received_item_data._id;
        });

        _ids.map((id) => {
          grnApprovalPendingSchema.create({
            purchase_id: null,
            grn_id: [], // Initialize grn_id as an array with the first element
            items: [id],
          });
        });

        if (bulk_purchase_data) {
          return response.status(200).json({
            data: bulk_purchase_data,
            message: "GRN Approval Pendings fetched successfully!!!",
          });
        } else {
          return response.status(404).json({
            message: "GRN Approval Pendings not found!!!",
          });
        }
      }
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};
