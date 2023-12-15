// DeOkumar
const componentSchema = require("../models/ComponentSchema");

exports.addComponent = async (req, res) => {
  try {
    const component = await componentSchema.create(req.body);
    res.status(200).json({
      message: "Component added successfully.",
      data: component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding Component",
      data: err,
    });
  }
};
exports.getAllCompComponents = async (req, res) => {
  try {
    const component = await componentSchema
      .find()
      .populate({
        path: "sub_components.subcomponent_id",
        populate: {
          path: "catalog.rating.companies.company_id",
          model: "Companies", // Replace with your actual company model name
        },
      })
      .exec();
    res.status(200).json({
      message: "Components Fetched Successfully",
      data: component,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Component",
      err: error,
    });
  }
};

// DeOkumar
exports.deleteComponents = async (req, res) => {
  try {
    const component = await componentSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Component deleted successfully",
      data: component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in deleting Component",
      data: err,
    });
  }
};

// DeOkumar
exports.getOneComponent = async (req, res) => {
  try {
    const component = await componentSchema
      .findById(req.params.id)
      .populate("sub_components.subcomponent_id")
      .populate({
        path: "sub_components.subcomponent_id",
        populate: {
          path: "catalog.rating.companies.company_id",
          model: "Companies", // Replace with your actual company model name
        },
      })
      .exec();
    res.status(200).json({
      message: "Component fetched successfully",
      data: component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching Component",
      data: err,
    });
  }
};

// DeOkumar
exports.updateComponent = async (req, res) => {
  try {
    const component = await componentSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Component updated successfully",
      data: component,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating Component",
      data: err,
    });
  }
};
