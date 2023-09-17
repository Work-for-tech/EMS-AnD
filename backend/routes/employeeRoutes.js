const express = require("express")
const employeeController = require("../controller/employeeController")

const router = express.Router();

router.post('/addemployee', employeeController.addEmployee)
router.get('/getemployee', employeeController.getEmployees)
router.put('/employee/:id', employeeController.updateEmployee)
router.get("/employee/:id", employeeController.getEmployeeById)
router.delete("/employee/:id", employeeController.deleteEmployee)

module.exports = router