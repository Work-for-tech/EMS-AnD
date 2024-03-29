const express = require("express");
const router = express.Router();

const store = require("../controller/storeController");

router.post("/addtostore", store.addToStore);
router.get("/getstore", store.getStore);

// Deokumar
router.put("/getstoredata", store.getStoreById);

module.exports = router;
