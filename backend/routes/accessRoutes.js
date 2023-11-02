const express = require("express");
const router = express.Router();

const access=require('../controller/accessManagementController')

router.post('/add',access.addAccess)
router.post('/remove',access.removeAccess)

module.exports=router