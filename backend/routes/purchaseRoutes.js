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
router.get("/", purchaseController.getPurchase);
router.post("/sendmail", purchaseController.sendMail);
router.post("/bulkindent", purchaseController.addBulkPurchase);

router.put('/:Id',purchaseController.upadatePurchase)

module.exports = router;
