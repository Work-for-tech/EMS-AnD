const express = require("express");
const router = express.Router();

const projectController = require("../controller/ProjectController");
const projectFinishController=require('../controller/projectCompletionController')

router.post("/add", projectController.addProject);

// Here
router.post("/getProjects", projectController.getProject);

// Here
router.get("/getAll", projectController.getProjects);

router.update('/finishingdetails',projectFinishController.updateOrCreate)
router.update('/projectComplete',projectFinishController.projectFinish)

module.exports = router;
