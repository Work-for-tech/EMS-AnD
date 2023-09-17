const express = require("express");
const router = express.Router();

const offerComponentController = require("../controller/OfferComponentController");

router.post("/add", offerComponentController.add);

router.get("/getOne/:id", offerComponentController.getOne);

module.exports = router;
