const subComponentSchema = require("../models/SubComponentSchema");

exports.add = async (req, res) => {
  try {
    const subComponent = await subComponentSchema.create(req.body);
    res.status(200).json({
      message: "Subcomponent added successfully.",
      data: subComponent,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error in adding Subcomponent",
      data: err,
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updatedItem = await subComponentSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(500).json({
        message: "Item Not Found",
      });
    }
    res.status(200).json({
      message: "Item Updated Successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating item",
      err: error,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deletedItem = await subComponentSchema.findByIdAndRemove(
      req.params.id
    );
    if (!deletedItem) {
      return res.status(500).json({
        message: "Item Not Found",
      });
    }
    res.status(200).json({
      message: "Sub Component Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting item",
      err: error,
    });
  }
};

exports.getAllSubComponents = async (req, res) => {
  try {
    const items = await subComponentSchema.find().populate({
      path: "catalog.rating.companies.company_id",
      model: "Companies", // Replace with your actual company model name
    });
    res.status(200).json({
      message: "All SubComponents Fetched SuccessFully",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching items",
      err: error,
    });
  }
};

// DeOkumar
exports.getOneSubComponent = async (req, res) => {
  try {
    const item = await subComponentSchema.findById(req.params.id).populate({
      path: "catalog.rating.companies.company_id",
      model: "Companies", // Replace with your actual company model name
    });

    if (!item) {
      return res.status(500).json({
        message: "Item Not Found",
      });
    }

    res.status(200).json({
      message: "Sub Component Fetched Successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching item",
      err: error,
    });
  }
};

exports.getOneSubComponentByDesc = async (req, res) => {
  try {
    const item = await subComponentSchema
      .findOne({ desc: req.body.desc })
      .populate({
        path: "catalog.rating.companies.company_id",
        model: "Companies",
      });

    if (!item) {
      return res.status(500).json({
        message: "Item Not Found",
      });
    }

    res.status(200).json({
      message: "Sub Component Fetched Successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching item",
      err: error,
    });
  }
};
