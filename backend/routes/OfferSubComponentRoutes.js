const express = require("express");
const router = express.Router();

const offerSubController = require("../controller/OfferSubComponent");

router.post("/add", offerSubController.add);

router.get("/getOne/:id", offerSubController.getOne);

router.get("/getAll", offerSubController.getAll);

router.put("/update/:id", offerSubController.update);

module.exports = router;
