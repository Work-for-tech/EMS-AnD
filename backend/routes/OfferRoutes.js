const express = require("express");
const router = express.Router();

const offerController = require("../controller/OfferController");

router.post("/add", offerController.newOffer);

router.get("/getOffers", offerController.getOffers);

router.post("/updateStatus/:id", offerController.updateOfferStatus);

router.get("/getOffer/:id", offerController.getOneOffer);

router.post("/finalprojects", offerController.getFinalOffers);

module.exports = router;
