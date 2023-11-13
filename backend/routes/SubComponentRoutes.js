const express = require("express");
const router = express.Router();

const subcomponentController = require("../controller/SubComponentController");

router.post("/add", subcomponentController.add);
router.get("/all", subcomponentController.getAllSubComponents);
router.get("/get/:id", subcomponentController.getOneSubComponent);
router.delete("/delete/:id", subcomponentController.deleteById);
router.put("/update/:id", subcomponentController.updateById);
router.post("/getOne", subcomponentController.getOneSubComponentByDesc);

module.exports = router;
