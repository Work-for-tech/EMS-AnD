const express = require("express");
const router = express.Router();

const projectController = require("../controller/ProjectController");
const projectFinishController = require("../controller/projectCompletionController");

router.post("/add", projectController.addProject);

// Here
router.post("/getProjects", projectController.getProject);

// Here
router.get("/getAll", projectController.getProjects);

router.put("/finishingdetails", projectFinishController.updateOrCreate);
router.put("/projectComplete", projectFinishController.projectFinish);
router.get(
  "/getCompleteDetails/:projectId",
  projectFinishController.getCompleteDetails
);

module.exports = router;
