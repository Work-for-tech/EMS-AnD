const issueSchema = require("../models/issueSchema");
const storeSchema = require("../models/storeSchema");

exports.addIssue = async (req, res) => {
  try {
    const issueSlip = await issueSchema.create(req.body);

    if (issueSlip != null && req.body.quantity >= 0) {
      await store
        .findOneAndUpdate(
          {
            $and: [
              { desc: req.body.desc },
              { catalog_number: req.body.catalog_number },
              { rating_value: req.body.rating_value },
              { companyId: req.body.companyId },
            ],
          },
          { $inc: { quantity: -req.body.quantity } }
        )
        .exec();

      res.status(201).json({ message: "Success", data: issueSlip });
    } else {
      throw new Error("Something went wrong in issueSlip");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong in issueSlip",
      error: e,
    });
  }
};

exports.getIssueList = async (req, res) => {
  try {
    const issueList = await issueSchema
      .find({})
      .populate("projectId")
      .populate({
        path: "items.subComponent",
        populate: {
          path: "company.company_name",
          model: "Companies",
        },
      });
    if (issueList != null) {
      res.status(200).json({
        message: "Issue List retrieved successfully",
        data: issueList,
      });
    } else {
      throw new Error("Something went wrong in IssueList");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong in issueSlip",
      error: e,
    });
  }
};
