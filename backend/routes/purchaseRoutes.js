const express = require("express")
const purchaseController = require("../controller/purchaseController")
const router = express.Router()

router.post('',purchaseController.addPurchase)
router.get("/:indentId",purchaseController.getPurchaseList)
router.get('/particularList/:id',purchaseController.getParticularPurchase)
router.post('/sendmail',purchaseController.sendMail)

module.exports=router