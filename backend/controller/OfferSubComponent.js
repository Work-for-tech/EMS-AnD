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
    console.log(err)
    res.status(500).json({
      message: "Error in adding offer_sub_component",
      data: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const offer_sub_component = await offerSubComponentSchema.findById(
      req.params.id
    );
    res.status(200).json({
      message: "offer_sub_component fetched successfully.",
      data: offer_sub_component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching offer_sub_component",
      data: err,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const offer_sub_components = await offerSubComponentSchema.find();
    res.status(200).json({
      message: "offer_sub_components fetched successfully.",
      data: offer_sub_components,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching offer_sub_components",
      data: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const offer_sub_component = await offerSubComponentSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "offer_sub_component updated successfully.",
      data: offer_sub_component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating offer_sub_component",
      data: err,
    });
  }
};
