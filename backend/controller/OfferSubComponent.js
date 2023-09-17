// Here
const offerSubComponentSchema = require("../models/OfferSubComponent");

exports.add = async (req, res) => {
  try {
    const offer_sub_component = await offerSubComponentSchema.create(req.body);
    res.status(200).json({
      message: "offer_sub_component added successfully.",
      data: offer_sub_component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding offer_sub_component",
      data: err,
    });
  }
};
