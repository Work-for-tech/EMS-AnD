const express = require("express");
const router = express.Router();

const projectController = require("../controller/ProjectController");

router.post("/add", projectController.addProject);

// Here
router.post("/getProjects", projectController.getProject);

// Here
router.get("/getAll", projectController.getProjects);

module.exports = router;
