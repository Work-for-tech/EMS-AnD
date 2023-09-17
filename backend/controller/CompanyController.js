const companySchema = require("../models/Company_MakeSchema");

exports.addCompany = async (req, res) => {
  try {
    const company = await companySchema.create(req.body);
    res.status(200).json({
      message: "Company added successfully.",
      data: company,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error in adding Company",
      data: err,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companySchema.find();
    res.status(200).json({
      message: "Companies Fetched Successfully",
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching companies",
      err: error,
    });
  }
};

// Here
exports.deleteCompany = async (req, res) => {
  try {
    const company = await companySchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Company deleted successfully",
      data: company,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in deleting Company",
      data: err,
    });
  }
};

// Here
exports.getOneCompany = async (req, res) => {
  try {
    const company = await companySchema.findById(req.params.id);
    res.status(200).json({
      message: "Company fetched successfully",
      data: company,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching Company",
      data: err,
    });
  }
};
