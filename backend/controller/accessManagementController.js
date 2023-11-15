const access = require("../models/accessSchema");

module.exports.addAccess = async (req, res) => {
  try {
    console.log(req.body);
    const AlreadyExist = await access.exists({ userId: req.body.userId });
    if (AlreadyExist) {
      const response = await access
        .findOneAndUpdate(
          { userId: req.body.userId },
          { moduleName: req.body.moduleName }
        )
        .exec();
      console.log(response);
      res.status(200).json({ message: "Access Added", access: response });
    } else {
      const response = await access.create({
        userId: req.body.userId,
        moduleName: req.body.moduleName,
      });
      console.log(response);
      res.status(200).json({ message: "Access Added", access: response });
    }
  } catch (err) {
    res.status(-9).json({
      message: "Error while Adding.",
      data: err,
    });
  }
};

module.exports.getAccess = async (req, res) => {
  try {
    console.log(req.params.id);
    const userAccess = await access.findOne({ userId: req.params.id });
    console.log(userAccess);
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
