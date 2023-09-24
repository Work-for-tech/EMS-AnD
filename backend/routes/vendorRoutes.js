const express = require("express");
const vendorController = require("../controller/vendorController");

const router = express.Router();

router.post("/addvendor", vendorController.addVendor);
router.get("/getvendor", vendorController.getVendors);
router.put("/vendor/:id", vendorController.updateVendor);
router.get("/vendor/:id", vendorController.getVendorById);
router.delete("/vendor/:id", vendorController.deleteVendor);

module.exports = router;
