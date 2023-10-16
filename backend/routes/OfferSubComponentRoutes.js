const express = require("express");
const router = express.Router();

const offerSubController = require("../controller/OfferSubComponent");

router.post("/add", offerSubController.add);

router.get("/getOne/:id", offerSubController.getOne);

module.exports = router;
