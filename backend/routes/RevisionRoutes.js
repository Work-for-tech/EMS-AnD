// Here
const express = require("express");
const router = express.Router();

const revisionController = require("../controller/RevisionController");

router.post("/getOne", revisionController.getRevision);

router.put("/update/:id", revisionController.updateRevision);

module.exports = router;
