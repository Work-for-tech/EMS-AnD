const receivedItemSchema = require("../models/receivedItems");

exports.createAndUpdateReceivedItem = async (request, response) => {
  try {
    const { _id, quantity_received } = request.body;

    const existing_received_data = await receivedItemSchema.findById(_id);

    if (existing_received_data) {
      existing_received_data.quantity_expected =
        existing_received_data.quantity_expected - quantity_received;
      existing_received_data.quantity_received =
        existing_received_data.quantity_received + quantity_received;

      const updated_received_data = await existing_received_data.save();

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