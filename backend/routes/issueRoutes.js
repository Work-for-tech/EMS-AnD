const express = require("express");
const router = express.Router();
const issueController = require("../controller/issueController");


router.post("/addissue", issueController.addIssue);
router.get("/getissuelist", issueController.getIssueList);

module.exports = router;
