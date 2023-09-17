const router = require("express").Router()
const modelController = require("../controller/modelByMachineController")

router.post("/addmodel", modelController.addModel)
router.get("/models", modelController.getModels)
router.put("/model/:id", modelController.updateModel)
router.get("/model/:id", modelController.getModelById)
router.delete("/model/:id", modelController.deleteModel)

module.exports = router
