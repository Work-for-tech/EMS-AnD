const express = require("express");
const router = express.Router();

const componentController = require("../controller/ComponentController");

router.post("/add", componentController.addComponent);
router.get("/all", componentController.getAllCompComponents);
router.delete("/delete/:id", componentController.deleteComponents);
router.get("/get/:id", componentController.getOneComponent);
router.put("/update/:id", componentController.updateComponent);

module.exports = router;
