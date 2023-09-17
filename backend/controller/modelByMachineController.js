const modelByMachineSchema = require("../models/modelByMachineSchema");

module.exports.addModel = async (request, response) => {
  try {
    const Model = await modelByMachineSchema.create(request.body);
    response.status(200).json({
      message: "Model added successfully.",
      data: Model,
    });
  } catch (err) {
    response.status(-9).json({
      message: "Error while adding Model.",
      data: err,
    });
  }
};

module.exports.getModels = async (request, response) => {
  try {
    const Models = await modelByMachineSchema
      .find({})
      .populate("machineId")
      .exec();
    response.status(200).json({
      message: "Models retrived successfully.",
      data: Models,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error while retriving data",
      data: err,
    });
  }
};

module.exports.updateModel = async (request, response) => {
  try {
    const Model = await modelByMachineSchema.findByIdAndUpdate(
      { _id: request.params.id },
      request.body
    );
    response.status(200).json({
      message: "Model updated successfully.",
      data: Model,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error while update data",
      data: err,
    });
  }
};

module.exports.getModelById = async (request, response) => {
  try {
    const Model = await modelByMachineSchema.findById(request.params.id);
    response.status(200).json({
      message: "Model retrived successfully",
      data: Model,
    });
  } catch (err) {
    response.status(200).json({
      message: "Error while retriving Model.",
      data: err,
    });
  }
};

module.exports.deleteModel = async (request, response) => {
  try {
    const Model = await modelByMachineSchema.findByIdAndDelete(
      request.params.id
    );
    response.status(200).json({
      message: "Model deleted successfully",
      data: Model,
    });
  } catch (err) {
    response.status(200).json({
      message: "Error while deleting Model.",
      data: err,
    });
  }
};
