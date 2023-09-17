const express = require("express");
const router = express.Router();

const projectController = require("../controller/ProjectController");

router.post("/add", projectController.addProject);

// Here
router.post("/getProjects", projectController.getProject);

// Here
router.get("/getAll", projectController.getProjects);

router.post("/changeProjectStatus", projectController.changeProjectStatus);

module.exports = router;
