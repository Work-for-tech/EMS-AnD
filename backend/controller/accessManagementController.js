const access = require("../models/accessSchema");

module.exports.addAccess = async (req, res) => {
  try {
    await access
      .findOneAndUpdate(
        { userId: req.body.userId },
        { $push: { moduleName: req.body.moduleName } }
      )
      .exec();
    res.status(200).json({ message: "Access Added" });
  } catch (err) {
    res.status(-9).json({
      message: "Error while Adding.",
      data: err,
    });
  }
};

module.exports.getAccess = async (req, res) => {
  try {
    const userAccess = await access.findOne({ userId: req.params.id });
    res.status(200).json({ message: "User Fetched", user: userAccess });
  } catch (err) {
    res.status(-9).json({
      message: "Error while Fetching.",
      data: err,
    });
  }
};

module.exports.removeAccess = async (req, res) => {
  try {
    await access
      .findOneAndUpdate(
        { userId: req.body.userId },
        { $pull: { moduleName: req.body.moduleName } }
      )
      .exec();
    res.status(200).json({ message: "Access Removed" });
  } catch (err) {
    res.status(-9).json({
      message: "Error while Removing.",
      data: err,
    });
  }
};
