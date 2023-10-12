const express = require("express");
const router = express.Router();
const received_controller = require("../controller/receivedItemController");

router.post("/create", received_controller.createAndUpdateReceivedItem);

module.exports = router;
