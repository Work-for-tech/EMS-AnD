const express = require("express");
const issueController = require("../controller/issueController");

const router = express.Router();

router.post("/addissue", issueController.addIssue);
router.get("/getissuelist", issueController.getIssueList);

module.exports = router;
