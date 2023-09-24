const vendor = require("../models/vendorSchema");

module.exports.addVendor = async (req, res) => {
  try {
    const data = await vendor.create(req.body);
    res.status(200).json({
      message: "Vendor added successfully.",
      data: data,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error in adding vendor",
      data: err,
    });
  }
};

module.exports.getVendors = async (req, res) => {
  try {
    const data = await vendor.find();
    res.status(200).json({
      message: "Vendor fetched successfully.",
      data: data,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error in adding vendor",
      data: err,
    });
  }
};

module.exports.updateVendor = async (req, resp) => {
  try {
    const data = await vendor.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    resp.status(200).json({
      message: "Vendor updated successfully.",
      data: data,
    });
  } catch (err) {
    resp.status(500).json({
      message: "Error while update data",
      data: err,
    });
  }
};

module.exports.getVendorById = async (req, resp) => {
  try {
    const data = await vendor.findById(req.params.id);
    resp.status(200).json({
      message: "Vendor retrived successfully",
      data: data,
    });
  } catch (err) {
    resp.status(200).json({
      message: "Error while retriving Vendor by Id.",
      data: err,
    });
  }
};

module.exports.deleteVendor = async (req, resp) => {
  try {
    const data = await vendor.findByIdAndDelete(req.params.id);
    resp.status(200).json({
      message: "Vendor deleted successfully",
      data: data,
    });
  } catch (err) {
    resp.status(200).json({
      message: "Error while deleting Vendor.",
      data: err,
    });
  }
};
