const express = require("express");
const router = express.Router();

const offerSubController = require("../controller/OfferSubComponent");

router.post("/add", offerSubController.add);

module.exports = router;
