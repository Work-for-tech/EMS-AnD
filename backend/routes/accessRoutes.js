const express = require("express");
const router = express.Router();

const access = require("../controller/accessManagementController");

router.post("/add", access.addAccess);
router.get("/get/:id", access.getAccess);
router.post("/remove", access.removeAccess);

module.exports = router;
