const machineSchema = require("../models/machineSchema");

module.exports.addMachine = async (request, response) => {
  try {
    const machine = await machineSchema.create(request.body);
    response.status(200).json({
      message: "Machine added successfully.",
      data: machine,
    });
  } catch (err) {
    response.status(-9).json({
      message: "Error wihie adding Machine.",
      data: err,
    });
  }
};

module.exports.getAllMachine = async (request, response) => {
  try {
    const machines = await machineSchema.find({});
    response.status(200).json({
      message: "Machine retrived successfully.",
      data: machines,
    });
  } catch (err) {
    response.status(-9).json({
      message: "Error wihie retriving Machine.",
      data: err,
    });
  }
};

module.exports.deleteMachineById = async (request, response) => {
  try {
    const machine = await machineSchema.findByIdAndDelete({
      _id: request.params.id,
    });
    response.status(200).json({
      message: "Machine deleted successfully.",
      data: machine,
    });
  } catch (err) {
    response.status(-9).json({
      message: "Error wihie deleting Machine.",
      data: err,
    });
  }
};
