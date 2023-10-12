const express = require("express");
const grnController = require("../controller/grnContoller");
const router = express.Router();

router.post("/create", grnController.createGrn);
router.get("/all", grnController.getGrns);

module.exports = router;
