const indentSchema = require("../models/indentSchema");
const bulkIndentSchema = require("../models/bulkIndentSchema");

module.exports.addIndentUsingPid = async (req, res) => {
  try {
    //body
    // {
    //     "clientId":"6502175b65e30d71f884e616",
    //     "projectId":"6505c367e8efb2ef88fb4c90",
    // "items":[{
    //     "subcomponent":"65031adc37efe09a975be9b1",
    //     "quantityRequired":1,
    //     "quantityOrdered":20
    // }
    // ]
    // }
    // console.log(req.body);
    var data = await indentSchema.findOne({
      projectId: req.body.projectId,
      clientId: req.body.clientId,
    });
    // console.log(data);
    if (data != null) {
      var upd = await indentSchema
        .updateOne({ _id: data?._id }, { $push: { items: req.body.items } })
        .exec();
      res.status(200).json({ message: "Items in indent Added" });
    } else {
      // console.log(22);
      var create = await indentSchema.create(req.body);
      // console.log(create);
      res.status(200).json({ message: "Items in indent Added" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.addBulkIndent = async (req, res) => {
  try {
    /*
        req.body to send
        "items":[{
                "subcomponent":"65031adc37efe09a975be9b1",
                "quantityRequired":1,
                "quantityOrdered":20
            }
            ]
        */
    var data = await bulkIndentSchema.create(req.body);
    if (data != null) {
      res.status(200).json({ message: "Buklk Indent Created", data: data });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.getonebulkindent = async (req, res) => {
  try {
    var data = await bulkIndentSchema
      .findById(req.params.id)
      .populate({ path: "items.subcomponent" });
    if (data != null) {
      res.status(200).json({ message: "Indent fetched", data: data });
    } else {
      res.status(400).json({ message: "required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.getindentByProjectId = async (req, res) => {
  try {
    var data = await indentSchema
      .find({ projectId: req.params.id })
      .populate("projectId")
      .populate("clientId")
      .populate({ path: "items.subcomponent" })
      .populate({
        path: "items.subcomponent",
        populate: { path: "company.company_name" },
      });
    if (data != null) {
      res.status(200).json({ message: "Indent fetched", data: data });
    } else {
      res.status(400).json({ message: "required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.getIndentbypid = async (req, res) => {
  try {
    var data = await indentSchema
      .find({
        projectId: req.params.projectId,
        clientId: req.params.clientId,
        items: { $elemMatch: { purchased: false } },
      })
      .populate("projectId")
      .populate("clientId")
      .populate({ path: "items.subcomponent" })
      .populate({
        path: "items.subcomponent",
        populate: { path: "company.company_name" },
      });

    if (data != null) {
      res.status(200).json({ message: "Indent fetched", data: data });
    } else {
      res.status(400).json({ message: "required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.getBulkIndentForPurchase = async (req, res) => {
  try {
    var data = await bulkIndentSchema
      .find({ purchased: false })
      .populate({ path: "items.subcomponent" });
    if (data != null) {
      res.status(200).json({ message: "Indent fetched", data: data });
    } else {
      res.status(400).json({ message: "required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.GetBothIndentForList = async (req, res) => {
  try {
    var bulkData = await bulkIndentSchema.find().populate({
      path: "items.subcomponent",
      populate: { path: "company.company_name" },
    });
    var indentDataByPid = await indentSchema
      .find()
      .populate("projectId")
      .populate("clientId")
      .populate({
        path: "items.subcomponent",
        populate: { path: "company.company_name" },
      });

    if (bulkData != null && indentDataByPid != null) {
      res.status(200).json({
        message: "Indent fetched",
        bulkData: bulkData,
        indentDataByPid: indentDataByPid,
      });
    } else {
      res.status(400).json({ message: "Required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.updateDiscountIndent = async (req, res) => {
  try {
    var data = await indentSchema.updateOne(
      { _id: req.body._id, "items._id": req.body.itemId },
      { $set: { "items.$.discount": req.body.discount } }
    );
    if (data != null) {
      res.status(200).json({ message: "Indent updated", data: data });
    } else {
      res.status(400).json({ message: "required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};

module.exports.updateDiscountBulkIndent = async (req, res) => {
  try {
    var data = await bulkIndentSchema.updateOne(
      { _id: req.body._id, "items._id": req.body.itemId },
      { $set: { "items.$.discount": req.body.discount } }
    );
    if (data != null) {
      res.status(200).json({ message: "Indent updated", data: data });
    } else {
      res.status(400).json({ message: "required data not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in updating indent",
      data: error,
    });
  }
};
