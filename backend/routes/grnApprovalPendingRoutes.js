const express = require("express");
const router = express.Router();
const grnApprovalPendingController = require("../controller/grnApprovalPendingController");

router.get("/get", grnApprovalPendingController.getGrnApprovalPending);
router.post("/create", grnApprovalPendingController.createGrnApprovalPending);

module.exports = router;
