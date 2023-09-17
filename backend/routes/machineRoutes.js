const express = require("express")
const machineController = require("../controller/machineController")

const router = express.Router();

router.post('/addmachine', machineController.addMachine)
router.get('/machines', machineController.getAllMachine)
router.delete('/machine/:id', machineController.deleteMachineById)

module.exports = router