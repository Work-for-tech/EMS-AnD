const express = require("express");
const purchaseController = require("../controller/purchaseController");
const router = express.Router();

router.post("", purchaseController.addPurchase);
router.get("/:indentId", purchaseController.getPurchaseList);
router.get("/bulk/:indentId", purchaseController.getBulkPurchaseList);
router.get("/getboth", purchaseController.getBothDetails);
router.get("/particularList/:id", purchaseController.getParticularPurchase);
router.get(
  "/particularbulklist/:id",
  purchaseController.getParticularBulkPurchase
);
router.post("/sendmail", purchaseController.sendMail);
router.post("/bulkindent", purchaseController.addBulkPurchase);

module.exports = router;
