const receivedItemSchema = require("../models/receivedItems");
const storeSchema = require('../models/storeSchema')
offerSubCompoSchema = require('../models/OfferSubComponent')

exports.createAndUpdateReceivedItem = async (request, response) => {
  try {
    const { _id, quantity_received } = request.body;

    const existing_received_data = await receivedItemSchema.findById(_id);

    if (existing_received_data) {
      existing_received_data.quantity_expected =
        parseInt(existing_received_data.quantity_expected) - parseInt(quantity_received);
      existing_received_data.quantity_received =
        parseInt(existing_received_data.quantity_received) + parseInt(quantity_received);

      const updated_received_data = await existing_received_data.save();

      var offerData = await receivedItemSchema.findById(_id).populate('sub_component_id')
      console.log(offerData)
      var store = await storeSchema
        .findOneAndUpdate(
          {
            $and: [
              { desc: offerData.sub_component_id.desc },
              { catalog_number: offerData.sub_component_id.catalog_number },
              { rating_value: offerData.sub_component_id.rating_value },
              { companyId: offerData.sub_component_id.companyId },
            ],
          },
          { $inc: { quantity: quantity_received } },
          { upsert: true }
        )
        .exec();
      console.log(store)
      return response.status(200).json({
        data: updated_received_data,
        message: "Received Item Updated Successfully",
      });
    }
  } catch (err) {
    console.log(err)
    response.status(500).json({
      message: err.message,
    });
  }
};

exports.getReceivedItem = async (req, res) => {
  try {
    const receivedItem = await receivedItemSchema.findById(
      req.params.id,
    );

    return res.status(200).json({
      data: receivedItem,
      message: "Received Item List",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}