const express = require("express");
const indentController = require("../controller/indentController");
const router = express.Router();

router.post("/addindentusingpid", indentController.addIndentUsingPid);
router.get("/getindents/:clientId/:projectId", indentController.getIndentbypid);
router.post("/addbulkindent", indentController.addBulkIndent);
// Deokumar
router.get("/getonebulkindent/:id", indentController.getonebulkindent);

router.get("/getbulkindent", indentController.getBulkIndentForPurchase);
router.get("/getbothindentsdata", indentController.GetBothIndentForList);

module.exports = router;
