// Here
const offerComponentSchema = require("../models/OfferComponent");

exports.add = async (req, res) => {
  try {
    const offer_component = await offerComponentSchema.create(req.body);
    res.status(200).json({
      message: "offer_component added successfully.",
      data: offer_component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding offer_component",
      data: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const offer_component = await offerComponentSchema
      .findById(req.params.id)
      .populate({
        path: "sub_components",
        model: "offersubcomponent",
        populate: {
          path: "company.company_name",
          model: "Companies",
        },
      })
      .exec();

    if (!offer_component) {
      return res.status(404).json({
        message: "Offer component not found.",
      });
    }

    res.status(200).json({
      message: "Offer component fetched successfully.",
      data: offer_component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching offer_component",
      data: err,
    });
  }
};
