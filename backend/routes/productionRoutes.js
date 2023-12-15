const express = require("express");
const router = express.Router();

const prodController = require("../controller/productionController");

router.post("", prodController.add);
router.get("/:projectId", prodController.get);
router.put("/update", prodController.update);

module.exports = router;
