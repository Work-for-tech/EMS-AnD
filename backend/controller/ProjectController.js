const projectSchema = require("../models/projectSchema");

exports.addProject = async (req, res) => {
  try {
    const project = await projectSchema.create(req.body);

    res.status(200).json({
      message: "Project added successfully.",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding project",
      data: err,
    });
  }
};

// Here
exports.getProject = async (req, res) => {
  try {
    const project = await projectSchema.find({
      client_id: req.body.client_id,
    });

    res.status(200).json({
      message: "Project fetched successfully.",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching project",
      data: err,
    });
  }
};

// Here
exports.getProjects = async (req, res) => {
  try {
    const project = await projectSchema.find().populate("client_id").exec();

    res.status(200).json({
      message: "Project fetched successfully.",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching project",
      data: err,
    });
  }
};

exports.changeProjectStatus = async (req, res) => {
  try {
    const project = await projectSchema.findById(req.body.project_id);

    if (project) {
      project.is_finalized = !project.is_finalized;

      await project.save();

      res.status(200).json({
        message: "Project fetched successfully.",
        data: project,
      });
    } else {
      res.status(404).json({
        message: "Project not found.",
        data: project,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching project",
      data: err,
    });
  }
};
