const EmployeeSchema = require("../models/EmployeeSchema");

module.exports.addEmployee = async (request, response) => {
  try {
    const employee = EmployeeSchema.create(request.body);
    response.status(200).json({
      message: "Employee added successfully.",
      data: employee,
    });
  } catch (err) {
    response.status(-9).json({
      message: "Error while adding employee.",
      data: err,
    });
  }
};

module.exports.getEmployees = async (request, response) => {
  try {
    const Employees = await EmployeeSchema.find({});
    response.status(200).json({
      message: "Employees retrived successfully.",
      data: Employees,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error while retriving data",
      data: err,
    });
  }
};

module.exports.updateEmployee = async (request, response) => {
  try {
    const Employee = await EmployeeSchema.findByIdAndUpdate(
      { _id: request.params.id },
      request.body
    );
    response.status(200).json({
      message: "Employee updated successfully.",
      data: Employee,
    });
  } catch (err) {
    response.status(500).json({
      message: "Error while update data",
      data: err,
    });
  }
};

module.exports.getEmployeeById = async (request, response) => {
  try {
    const Employee = await EmployeeSchema.findById(request.params.id);
    response.status(200).json({
      message: "Employee retrived successfully",
      data: Employee,
    });
  } catch (err) {
    response.status(200).json({
      message: "Error while retriving Employee.",
      data: err,
    });
  }
};

module.exports.deleteEmployee = async (request, response) => {
  try {
    const Employee = await EmployeeSchema.findByIdAndDelete(request.params.id);
    response.status(200).json({
      message: "Employee deleted successfully",
      data: Employee,
    });
  } catch (err) {
    response.status(200).json({
      message: "Error while deleting Employee.",
      data: err,
    });
  }
};
